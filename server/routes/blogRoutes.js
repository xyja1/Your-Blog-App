const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlog,
} = require("../controllers/blogController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

// GET all blogs
router.get("/", getAllBlogs);

// GET blog by ID
router.get("/:blogId", getBlogById);

// POST new blog
router.post("/", createBlog);

// PUT update blog
router.put("/:id", verifyToken, updateBlog);

// DELETE blog
router.delete("/:id", verifyToken, deleteBlog);

// SEARCH blogs
router.get("/search/:id", searchBlog);

module.exports = router;
