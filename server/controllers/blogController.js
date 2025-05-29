const blogs = require("../models/blogModel");
const commentModel = require("../models/commentModel");
const mongoose = require("mongoose");

const getAllBlogs = async (req, res) => {
  try {
    const category = req.query.category;
    const filter = category && category !== "all" ? { category } : {};
    const blogData = await blogs.find(filter);
    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params["blogId"];
    const author = res.locals.username;

    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).json({ message: "Invalid blog ID." });
    }

    const blogData = await blogs.findById(blogId).lean();

    if (!blogData) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).json({
      ...blogData,
      auth: blogData.author === author,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const createBlog = async (req, res) => {
  const { title, description, category, author } = req.body;

  try {
    const newBlog = new blogs({
      title,
      description,
      category,
      author: author || "guest",
    });

    const createdBlog = await newBlog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBlog = async (req, res) => {
  const blogId = req.params["id"];
  const user = res.locals.user.username;

  try {
    const updatedBlog = await blogs.findOneAndUpdate(
      { _id: blogId, author: user },
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  const blogId = req.params["id"];
  const user = res.locals.user.username;

  try {
    const blogData = await blogs.findOne({ _id: blogId });

    if (!blogData) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blogData.author !== user) {
      return res.status(403).json({ message: "User is not authorized." });
    }

    await commentModel.deleteMany({ blogId });
    await blogs.findOneAndDelete({ _id: blogId, author: user });

    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchBlog = async (req, res) => {
  try {
    const id = req.params["id"];
    const blogData = await blogs.find({
      $or: [
        { title: { $regex: id, $options: "i" } },
        { category: { $regex: id, $options: "i" } },
        { author: { $regex: id, $options: "i" } },
      ],
    });

    if (!blogData.length) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlog,
};
