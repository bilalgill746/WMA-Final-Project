import jwt, { decode } from "jsonwebtoken";
import next from "next";
import { NextResponse, NextRequest } from "next/server";

export default async function isAuthenticated(req = NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    return decoded.id;
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
