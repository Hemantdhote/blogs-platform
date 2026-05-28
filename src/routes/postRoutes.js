const express = require("express");

const router = express.Router();

const {getCreatePost, getAllPosts, createPost, getDashboard, getSinglePost, getEditPost, updatePost, deletePost} = require("../controllers/postController")

const isAuthenticated = require("../middleware/authMiddleware");

router.get("/dashboard", getDashboard);
router.get("/posts/create", getCreatePost);
router.post("/posts/create", createPost)
router.get("/posts", getAllPosts);
router.get("/posts/:id", getSinglePost);
router.get("/posts/edit/:id", getEditPost);
router.post("/post/edit/:id", updatePost);
router.get("/posts/delete/:id", deletePost)

module.exports = router