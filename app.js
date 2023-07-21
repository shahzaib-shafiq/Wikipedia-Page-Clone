const express=require("express");
const bodyParser=require("body-parser")
const mongoose = require('mongoose');
const ejs=require("ejs")

const app=express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const wikiSchema={
    title:String,
    content:String
}


const Article = mongoose.model('article', { name: String })


app.get("/articles",function(req,res){

    const getArticles = async () => {
        const foundArticles = await Article.find();
      
        if (foundArticles.length === 0) {
          return res.send("No articles found");
        } else {
          return res.send(foundArticles);
        }
      };    
    getArticles().then(articles => console.log(articles), error => console.log(error));
})



app.post("/articles",function(req,res){

    const postTitle=req.body.title;
    const postContent=req.body.content;

    const newArticle=Article({
title:postTitle,
content:postContent

    })

    newArticle.save();
})

app.delete("/articles",function(req,res){
    Article.deleteMany({},function(err){
        if (err) {
            res.send(err);
          } else {
            res.send("Del");
          }      
    })
})

app.listen(3000,function(){
    console.log("On")
})