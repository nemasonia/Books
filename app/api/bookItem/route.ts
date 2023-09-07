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

export async function POST(
  param: BookItem,
) {
  const { title, volumeNumber, memo, authorId } = param;

  await prisma.bookItem.create({
    data: {
      title, volumeNumber, memo, authorId
    },
  });
}

export async function PATCH(
  param: BookItem,
) {
  const id = param.id;
  const { volumeNumber, memo } = param;

  await prisma.bookItem.update({
    where: {
      id: id,
    },
    data: {
      volumeNumber,
      memo,
    },
  });
}

export async function DELETE(
  param: BookItem,
) {
  const id = param.id;

  await prisma.bookItem.delete({
    where: {
      id: id,
    },
  });
}