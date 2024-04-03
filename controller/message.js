const chatModel = require("../model/chat.model");
const MessageModel = require("../model/message.model");
const mongoose = require("mongoose");
const { getRecieverSocketId , io } = require("../socket/socket");

const sendMessage = async (req, res) => {
  // console.log("user" , req.user)
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    console.log(message, senderId, receiverId);

    if (!receiverId || !message) throw new Error("Missing fields");

    let chat = await chatModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await chatModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await MessageModel.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }
    await chat.save();

    // socket io implimentation here
    const recieverSocketId = getRecieverSocketId(receiverId)
    if(recieverSocketId){
      io.to(recieverSocketId).emit('newMessage', newMessage)
    }

    res.status(200).send(newMessage)
  } catch (error) {
    res.status(500).send(error)
  }
};

const getMessage = async (req , res) => {
    try {
        const receiverId = req.params.id;
    const senderId = req.user._id;

    let chat = await chatModel.findOne({
        participants: { $all: [senderId, receiverId] },
      }).populate('messages');

      if(!chat) return res.status(200).send([]);
      res.status(200).send(chat.messages);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
  sendMessage,
  getMessage
};
