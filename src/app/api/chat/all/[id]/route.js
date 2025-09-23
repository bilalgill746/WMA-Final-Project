import { connect } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/middlewares/isAuthenticated";
import Conversation from "@/modals/conversationModal";
import Message from "@/modals/messageModal";
connect();

export async function GET(req, { params }) {
  try {
    const userId = await isAuthenticated(req);
    if (userId instanceof NextResponse) return userId;
    const senderId = userId;
    const recieverId = params.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("messages");
    if (!conversation) {
      return NextResponse.json(
        { messages: [], success: true },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { messages: conversation.messages, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
