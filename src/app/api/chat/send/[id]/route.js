import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Conversation from "@/modals/conversationModal";
import Message from "@/modals/messageModal";
connect();
export async function POST(req, { params }) {
  try {
    const userId = await isAuthenticated(req);
    if (userId instanceof NextResponse) return userId;
    const senderId = userId;
    const recieverId = params.id;
    const reqBody = await req.json();
    const { message } = reqBody;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      recieverId,
      message: message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    return NextResponse.json({ success: true, newMessage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
