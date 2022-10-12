const express=require('express');

const Router=express.Router();

const BlogModel=require("../models/blog");

//return all the blogs

Router.get("/",async(req,res)=>{
 try {
    const blogs=await BlogModel.find();
    if(!blogs){
        return res.status(404).json({msg:"No Blogs Found"});
    }
    return res.status(200).json({msg:blogs});

 } catch (err) {
   res.status(500).json({ msg: "Error occured" });
 }
});

//return a specific blog
Router.get("/:id",async(req,res)=>{
    try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "blog is not being found" });
    }
    res.status(200).json({msg:blog});
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//update a blog

Router.put("/update/:id",async(req,res)=>{
    try {
        
         const blog = await BlogModel.findById(req.params.id);
          if (!blog) {
            return res.status(404).json({ msg: "blog has not been found" });
          }
          //updation
          const updatedblog=await BlogModel.findByIdAndUpdate(req.params.id,{name:req.body.name,text:req.body.text});
          if(!updatedblog){
            return res.status(200).json({msg:"Blog has been updated"});
          }

    } catch (err) {
      return res.status(500).json({ msg: "Server Error" });
    }
})
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

//create a blog
Router.post("/create",async(req,res)=>{
   try{
const newBlog=new BlogModel({
    text:req.body.text,
    name:req.body.name
});
   await newBlog.save((err,result)=>{
    if(err){
        return res.status(500).json({msg:"Error"});
    }
    else{
        return res.status(200).json({msg:"Blog is created successfully"});
    }
});
   }
   catch(err){
    res.status(500).json({msg:"Error occured"});
   }
})

//return all comments
Router.get("/:id/comments",async(req,res)=>{
    try {
const blog=await BlogModel.findById(req.params.id);

if(!blog){
     return res.status(404).json({ msg: "blog not found" });
}
return res.status(200).json({msg:blog.comments});

    } catch (err) {
      res.status(500).json({ msg: "Error occured" });
    }
});


//create a comment

Router.post("/:id/comment/add",async(req,res)=>{
    try {
        const blog=await BlogModel.findById(req.params.id);
        const newComment = {
          text: req.body.text,
        };
        blog.comments.unshift(newComment);
        await blog.save();
        return res.status(200).json({msg:"Your comment has been created"});
    } catch (err) {
      res.status(500).json({ msg: "Error occured" });
    }
});

//get a comment
Router.get("/:id/comment/:cid", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "blog not found" });
    }
   const single_comment=blog.comments.filter((data)=>data._id.toString()===req.params.cid);
    
    return res.status(200).json({ msg: single_comment });
  } catch (err) {
    res.status(500).json({ msg: "Error occured" });
  }
});

//update a comment
Router.put("/:id/comment/:cid", async (req, res) => {
  try {
    console.log(req.body)
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "blog not found" });
    }
    await BlogModel.updateOne({_id:req.params.id,"comments.id":req.params.cid},{$set:{"comments.$.text":req.body}});
    return res.status(200).json({ msg: "Your comment has been updated" });
  } catch (err) {
    res.status(500).json({ msg: "Error occured" });
  }
});

//delete a comment



module.exports=Router;
