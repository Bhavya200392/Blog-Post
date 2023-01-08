//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
// Database
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/BlogDB",{useNewUrlParser: true});
//Making Schema
const blog_schema=new mongoose.Schema({
  _id:Number,
  name:String,
  blog:String
})
//post collection
const Post=mongoose.model("blog",blog_schema);

const id_schema=new mongoose.Schema({
  count:Number
})
const id=mongoose.model("id",id_schema);
// const new_id=new id({
// count:1
// });
// new_id.save()



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var _ = require('lodash');
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
var posts=[];


//Routes
app.get('/', function(req, res) {

  res.render("home",{
    HomeSartingContent:homeStartingContent,
    posts:posts
  });

});
app.get('/about', function(req, res) {
  res.render("about",{AboutPage:aboutContent});
});


app.get('/post', function(req, res) {
  let blog_array = [];
 
  Post.find({},function(err,  Blogs) {
    blog_array=Blogs;
    res.render("blogs",{
      posts:blog_array
    });
    // blog_array.forEach(function(blogs){
    //   console.log(blogs.name);
    // })
  });
})

app.get('/post/:newblog', function(req, res){
  // console.log(req.params.newblog);
  posts.forEach(function(p){
    if( _.lowerCase(p.post)===_.lowerCase(req.params.newblog))
    {
      console.log("Found");
      res.render("post",{Name:p.post,Content:p.Blog})
    }
    // else {
    //   let content="Soory ! We Dont Have Any Blog Of "+p.post;
    //   console.log("Not Found");
    //   res.render("post",{Name:p.post,Content:content}) 
    // }
  })
})

app.get('/contact', function(req, res) {
  res.render("contact",{ContactPage:contactContent});
});
app.get('/compose', function(req, res) {
 
  res.render("compose");
});

app.post('/compose',function(req, res) {
  //Making Document And Save Into Database 
  //Take The Value From id data base stor into id variable and add 1 and use for new post variable---Todo
  let blog_id=0;

  id.find({},function(err,value){
  blog_id=value[0].count+1;

  const new_post=new Post({
    _id :blog_id,
    name:req.body.blog,
    blog:req.body.fullblog
  });
  //Store The Blog Into Database
  new_post.save();
  //update the id value into database
  var count_id = '63ba9d3239f84f11c9cf623c';
  id.findByIdAndUpdate(count_id, { count: blog_id },function (err, docs) {
    if (err){
        console.log(err)
    }
  });
})


  res.redirect('/');
  // console.log(postObj);
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
