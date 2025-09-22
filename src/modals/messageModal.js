import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    messageSchema: { type: String, required: true },
});
const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;