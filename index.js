// app.js
const express = require('express');
const app = express();
const port = 2001;
const mongoose = require("mongoose");


main()
    .then(() => {
        console.log("connection successfull")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/practice');


}

const path = require("path");
const Chat = require("./model/chat.js");

const methodOverride = require('method-override');



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set(express.static(path.join(__dirname, "public")));




//show all posts
app.get('/posts', async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

//Add new post page

app.get('/posts/new', (req, res) => {
    res.render("postchat.ejs");

});

//using post request add new post


app.post('/posts', (req, res) => {
    let { username, post } = req.body;
    let newChat = new Chat({
        username: username,
        post: post
    });
    newChat
        .save()
        .then((res) => {
            console.log("chat was saved")

        })
        .catch(() => {
            console.log(err);
        });

    res.redirect("/posts")

})

//Edit route
app.get('/posts/:id/edit', async (req, res) => {
    let { id } = req.params;
    let post = await Chat.findById(id);

    res.render("edit.ejs", { post });


})

//put data route

app.put('/posts/:id', async (req, res) => {
    let { id } = req.params;
    let { post: newContent } = req.body;

    let post = await Chat.findByIdAndUpdate(id, { post: newContent }, {
        runValidators: true, new: true
    })
    console.log(post);


    res.redirect("/posts");



})




//delete route
app.delete('/posts/:id', async (req, res) => {
    let { id } = req.params;

    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);

    res.redirect("/posts");


})



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/posts`);
});
