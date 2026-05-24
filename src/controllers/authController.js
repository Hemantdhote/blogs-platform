const bcrypt = require("bcrypt");

const User = require("../models/User")

exports.getRegister = (req,res)=>{
  res.render("auth/register");
}

exports.getLogin = (req,res) =>{
  res.render("auth/login");
}

exports.registerUser = async (req,res) =>{
  try{
   const {name, email, password} = req.body;

   const existingUser = await User.findOne({email});

   if(existingUser){
    req.flash("error", "user already exists");
    return res.redirect("/register")
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
    name,
    email,
    password:hashedPassword
   });

   req.flash("success", "user registered successfully");
   res.redirect("/dashboard");

  }catch(err){
    console.log(err);
    req.flash("error", "Something went wrong");
    res.redirect("/register")
  }
}



exports.loginUsers = async (req,res) =>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
      req.flash("error", "user not found");
      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      req.flash("error", "invalid email or password");
      return res.redirect("/login")
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    req.flash("success", "user login successfully");
    res.redirect("/dashboard");

  }catch(err){
    console.log(err);
    req.flash("error", "something went wrong");
   res.redirect("/login"); 
  }
}