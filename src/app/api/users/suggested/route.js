import { connect } from "@/utils/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/middlewares/isAuthenticated";

connect();

export async function GET(req) {
  try {
    const authResponse = await isAuthenticated(req);
    if (authResponse instanceof NextResponse) return authResponse;
    const userId = authResponse;
    const suggestedUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    if (!suggestedUsers) {
      return NextResponse.json({
        message: "Currently do not have any users",
      }).status(400);
    }
    return NextResponse.json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
  }
}
