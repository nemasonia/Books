import { prisma } from "@/lib/prisma"

import type { BookItem } from "@prisma/client"

export async function GET(
  param: BookItem,
) {
  const authorId = param.authorId;

  const bookItems = await prisma.bookItem.findMany({
    where: {
      authorId: authorId,
    },
    orderBy: {
      title: "asc"
    }
  });

  return bookItems
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