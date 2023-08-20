import { NextResponse } from 'next/server';

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions) // セッション情報を取得
  return NextResponse.json({ message: "ok" });
}