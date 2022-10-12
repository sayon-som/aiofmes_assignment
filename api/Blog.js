const express = require("express");
const app=express();
const Router = express.Router();

const BlogModel = require("../models/blog");



// Routes
/**
 * @swagger
 * /api/Blog:
 *  get:
 *    description: return all blogs
 *    responses:
 *      '200':
 *        description: A successful response
 */

//return all the blogs
Router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    if (!blogs) {
      return res.status(404).json({ msg: "No Blogs Found" });
    }
    return res.status(200).json({ msg: blogs });
  } catch (err) {
    res.status(500).json({ msg: "Error occured" });
  }
});

// Routes
/**
 * @swagger
 * /api/Blog/:id:
 *  get:
 *    description: return a specific blog blog
 *    responses:
 *      '200':
 *        description: A successful response
 */

//return a specific blog
Router.get("/:id", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "blog is not being found" });
    }
    res.status(200).json({ msg: blog });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Routes
/**
 * @swagger
 * /api/Blog/update/:id:
 *  get:
 *    description: update a specific blog
 *    responses:
 *      '200':
 *        description: A successful response
 */

//update a blog
Router.put("/update/:id", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "blog has not been found" });
    }
    //updation
    const updatedblog = await BlogModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      text: req.body.text,
    });
    if (!updatedblog) {
      return res.status(200).json({ msg: "Blog has been updated" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

// Routes
/**
 * @swagger
 * /api/Blog/:id:
 *  get:
 *    description: delete a specific blog
 *    responses:
 *      '200':
 *        description: A successful response
 */
//delete a blog
Router.delete("/:id", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    //check if the blog exist
    if (!blog) {
      return res.status(404).json({ msg: "blog not found" });
    }
    await blog.remove();
    return res.json({ msg: "blog is being successfully deleted" });
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
});

// Routes
/**
 * @swagger
 * /api/Blog/:create:
 *  get:
 *    description: create a blog
 *    responses:
 *      '200':
 *        description: A successful response
 */
//create a blog
Router.post("/create", async (req, res) => {
  try {
    const newBlog = new BlogModel({
      text: req.body.text,
      name: req.body.name,
    });
    await newBlog.save((err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Error" });
      } else {
        return res.status(200).json({ msg: "Blog is created successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Error occured" });
  }
});

// Routes
/**
 * @swagger
 * /api/Blog/:id/comments:
 *  get:
 *    description: return  all comments for a specific blog
 *    responses:
 *      '200':
 *        description: A successful response
 */
//return all comments
Router.get("/:id/comments", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "blog not found" });
    }
    return res.status(200).json({ msg: blog.comments });
  } catch (err) {
    res.status(500).json({ msg: "Error occured" });
  }
});

// Routes
/**
 * @swagger
 * /api/Blog/:id/comment/add
 *  get:
 *    description: adds a comment
 *    responses:
 *      '200':
 *        description: A successful response
 */
//create a comment
Router.post("/:id/comment/add", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    const newComment = {
      text: req.body.text,
    };
    blog.comments.unshift(newComment);
    await blog.save();
    return res.status(200).json({ msg: "Your comment has been created" });
  } catch (err) {
    res.status(500).json({ msg: "Error occured" });
  }
});

// Routes
/**
 * @swagger
 * /api/Blog/:id/comment/:cid
 *  get:
 *    description: returns a specific comment
 *    responses:
 *      '200':
 *        description: A successful response
 */
//get a comment
Router.get("/:id/comment/:cid", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "blog not found" });
    }
    const single_comment = blog.comments.filter(
      (data) => data._id.toString() === req.params.cid
    );

    return res.status(200).json({ msg: single_comment });
  } catch (err) {
    res.status(500).json({ msg: "Error occured" });
  }
});

// Routes
/**
 * @swagger
 * /api/Blog/:id/comment/:cid
 *  get:
 *    description: update a particular comment
 *    responses:
 *      '200':
 *        description: A successful response
 */
//update a comment
Router.put("/:id/comment/:cid", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "blog not found" });
    }
    await BlogModel.updateOne(
      { _id: req.params.id, "comments._id": req.params.cid },
      { $set: { "comments.$.text": req.body.text } }
    );
    return res.status(200).json({ msg: "Your comment has been updated" });
  } catch (err) {
    res.status(500).json({ msg: "Error occured" });
  }
});

// Routes
/**
 * @swagger
 * /api/Blog/:id/comment/:cid
 *  get:
 *    description: deletes a specific comment
 *    responses:
 *      '200':
 *        description: A successful response
 */
//delete a comment
Router.delete("/:id/comment/:cid", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "blog not found" });
    }
    const comments = blog.comments.find((data) => data.id === req.params.cid);
    if (!comments) {
      return res.status(404).json({ msg: "The comment does not exists" });
    }
    blog.comments = blog.comments.filter(({ id }) => id !== req.params.cid);

    await blog.save((err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Mongoose error" });
      } else {
        return res.status(200).json({ msg: "Your comment has been deleted" });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Error occured" });
  }
});

module.exports = Router;
