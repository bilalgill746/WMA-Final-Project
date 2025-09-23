import { connect } from "@/utils/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import isAuthenticated from "@/middlewares/isAuthenticated";
connect();

export async function GET(req, { params }) {
  try {
    const authResponse = await isAuthenticated(req);
    if (authResponse instanceof NextResponse) return authResponse; // Only return if it's an error

    const userId = params.id;
    const user = await User.findById(userId).select("-password");

    return NextResponse.json({ user, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
