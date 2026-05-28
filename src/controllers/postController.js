const Post = require("../models/Post");

exports.getCreatePost = (req, res) =>{
  res.render("posts/create")
}

exports.getDashboard = async (req,res) =>{
  try{
    const posts = await Post.find();
    res.render("dashboard", {posts})
    console.log("dash", posts);
    

  }catch(err){
    console.log(err);
    
  }
}

exports.createPost = async (req,res) =>{
  try{
    const {title, content, category} = req.body;

    await Post.create({
      title,
      content, 
      category,
      author:req.session.user._id
    });

    req.flash("success", "post created successfully");
    res.redirect("/dashboard");

  }catch(err){
    console.log(err);
    req.flash("error", "something went wrong");
    res.redirect("/posts/create");
  }
}


exports.getAllPosts = async (req,res) =>{
  try{

    const posts = await Post.find().populate("author").sort({createdAt:-1})

    res.render("posts/index", {posts})

  }catch(err){
    console.log(err);
   
  }
}

exports.getSinglePost = async (req, res) => {
  try{
    const post = await Post.findById(req.params.id).populate("author");
    res.render("posts/single", {post});
  }
  catch(err){
    console.log(err);

    
  }
}

exports.getEditPost = async (req,res) =>{
  try{
    const post = await Post.findById(req.params.id);
    res.render("/posts/edit", {post}); 

  }catch(err){
    console.log(err);
  }
}


exports.updatePost = async (req,res) =>{
  try{
    const {title, content, category } = req.body;
    await Post.findByIdAndUpdate(req.params.id, {
      title,
      content, 
      category
    });
    req.flash("success", "post created");
    res.redirect("/dashboard");

  }catch(err){
    console.log(err);
    req.flash("error", "something went wrong");
  }
}

exports.deletePost = async (req,res) =>{
  try{
    await Post.findByIdAndDelete(req.params.id);
    req.flash("success", "post deleted");
    res.redirect("/dashboard")

  }
  catch(err){
    console.log(err);
    
  }
}