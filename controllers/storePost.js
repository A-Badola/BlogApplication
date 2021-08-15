const BlogPost = require('../models/BlogPost.js')
const path = require('path')
const { create } = require('../models/BlogPost.js')

module.exports = (req,res)=>{
  let image = req.files.image;
  console.log(image);
  image.mv(path.resolve(__dirname,'..','public/assets/img',image.name),async(error)=>{
    await BlogPost.create({
      ...req.body,
      userid: req.session.userId,
      image: '/assets/img/' + image.name
     
   })
   
   res.redirect('/')
  })
}