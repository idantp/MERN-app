const mongoose = require('mongoose');


// Schema 
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date:{
        type: String,
        default: Date.now()
    }
});
// Model
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
 
// const BlogPostInstance = new BlogPost(data);
// BlogPostInstance.save((error)=>{
//     if(error){
//         console.log("something went wrong in saving data");
//     }else{
//         console.log("Data has been saved");
//     }
// });

module.exports = BlogPost;