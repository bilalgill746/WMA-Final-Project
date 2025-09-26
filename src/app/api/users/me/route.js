import { connect } from "@/utils/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();

export async function POST(req = NextRequest) {
  const userId = await getDataFromToken(req);
  const user = await User.findOne({ _id: userId }).select("-password");
  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
