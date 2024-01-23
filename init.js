const mongoose = require("mongoose");
const Chat = require("./model/chat.js");
main()
    .then(() => {
        console.log("connection successfull")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/practice');


}

let allChats = [
    {
        username: "rahul",
        post: "hy i m rahul"
    },
    {
        username: "saurabh",
        post: "hy i m Saurabh"
    },
    {
        username: "unknown",
        post: "hy i m unknown"
    },
];

Chat.insertMany(allChats);



