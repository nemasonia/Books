import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma"

import type { BookItem } from "@prisma/client"
import { string } from 'zod';

export async function GET(
  request: NextRequest
) {
  const authorId = request.nextUrl.searchParams.get("id");
  const bookItems = await prisma.bookItem.findMany({
    where: {
      authorId: authorId,
    },
    orderBy: {
      title: "asc"
    }
  });

  return NextResponse.json(bookItems);
}

export async function PATCH(
  request: NextRequest
) {
  const BookItem = await request.json();
  const { id, title, volumeNumber, memo } = BookItem.updatedRow;

  await prisma.bookItem.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      volumeNumber: Number(volumeNumber),
      memo: memo,
    },
  });
}

export async function POST(
  request: NextRequest
) {
  const BookItem = await request.json();
  const { id, title, volumeNumber, memo, authorId } = BookItem.bookItem;
  await prisma.bookItem.create({
    data: {
      id: id,
      title: title,
      volumeNumber: Number(volumeNumber),
      memo: memo,
      authorId: authorId,
    },
  });
  return NextResponse.json({ message: "This Worked", success: true });
}

export async function DELETE(
  request: NextRequest
) {
  const BookItem = await request.json();
  const id = BookItem.id[0];

  await prisma.bookItem.delete({
    where: {
      id: id,
    },
  },);
  return NextResponse.json({ message: "This Worked", success: true });
}