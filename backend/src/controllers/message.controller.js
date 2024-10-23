import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';

export const sendMessage = async (req,res,next) =>{
    try{
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user.id;

        let conversation = await Conversation.findOne({
            participants  : { $all : [senderId,receiverId]},
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId,receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        // socket.io functionality;

        res.status(201).send({
            "status" : "success",
            "message" : "Message send successfully.",
            data : newMessage
        })
    }catch(err){
        console.log("Error: "+err);
        next(error)
    }
}

export const getMessages = async (req,res,next) => {
    try{
        const {id : receiverId} = req.params;
        const senderId = req.user.id;

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]}
        }).populate("messages");

        if(!conversation){
            return res.status(200).send({"status" : "success", "message" : "No any conversation yet.", "data" : []});
        }
        const messages =  conversation.messages;
        res.status(200).send({"status" : "success", "message" : "messsages found succcessfully.","data" : messages})
    }catch(err){
        console.log("Error: " + err);
        next(err);
    }
}