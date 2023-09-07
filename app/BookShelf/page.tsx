'use client';

import { useState, useEffect, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import { booksItemCol } from "@/types/bookItem"
import { useSession } from 'next-auth/react';

import type { BookItem } from "@prisma/client"

const BookShelf = () => {
  const [content, setContent] = useState('');
  const [dataSource, setDataSource] = useState<BookItem[]>([]);

  const { data: session } = useSession();
  const authorId = (session == null) ? "" : session.user?.id;

  useEffect(() => {
    const fetchBookItem = async () => {
      const response = await fetch(`/api/bookItem?id=${authorId}`, {
        method: 'GET',
      });
      const bookItem = await response.json();
      setDataSource(bookItem);
    };
    fetchBookItem();
  },);

  const BookItem = async () => {
    const response = await fetch(`/api/bookItem?id=${authorId}`, {
      method: 'GET',
    });

    const bookItem = await response.json();
    setDataSource(bookItem);
  };

  return (
    <div className="BookShelf">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dataSource}
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
