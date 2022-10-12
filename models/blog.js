const mongoose=require('mongoose');
const blogSchema=new mongoose.Schema({
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    // },
    text:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    }
    ,

    comments:[{
        // user:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:"User"
        // },
        text:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            deafult:Date.now
        }
    }],
    date:{
        type:Date,
        deafult:Date.now
    }
});
module.exports=mongoose.model("Blog",blogSchema);