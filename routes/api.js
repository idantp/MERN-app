const express = require('express');
const router = express.Router();

const BlogPost = require('../models/blogPost')

// define ROUTES
router.get('/',(req,res) =>{
    // sending all data to the client
    BlogPost.find({})
    .then((data) => {
        console.log('Data: ', data);
        res.json(data); 
    })
    .catch((error) => {
        console.log('Error: ', error);
    });
});

router.post('/save',(req,res) =>{
    console.log('Body: ',req.body);
    const data = req.body;
    const newBlogPost = new BlogPost(data);
    newBlogPost.save((error) =>{
        if(error){
            res.status(500).json({msg: 'Sorry, internal server issue'});
            return;
        }
        // default res status is 200 (OK) - so no need to add
        return res.json({msg: 'Data has been saved'});
    })
     
});

router.get('/name',(req,res) =>{
    const data = {
        username: 'name name',
        age: 27
    };
    res.json(data); 
});


module.exports = router;