'use client';

import React from "react";
import { POST, GET, PATCH, DELETE } from "../api/bookItem/route"
import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import { booksItemCol } from "@/types/bookItem"
import { useSession } from 'next-auth/react';

import type { BookItem } from "@prisma/client"

const BookShelf = () => {
  const { data: session } = useSession();

  const bookItem: BookItem = {
    id: "null",
    title: "string",
    volumeNumber: 1,
    memo: "string",
    authorId: (session == null) ? "" : session.user?.id,
  };

  let rows: BookItem[] = []
  GET(bookItem).then(val => { rows = val })

  return (
    <div className="BookShelf">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={booksItemCol}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default BookShelf;
