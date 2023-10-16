'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp, GridRowSelectionModel, jaJP, GridRowId } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { Button } from "@mui/material";

import { booksItemCol } from "@/types/bookItem"

import type { BookItem } from "@prisma/client"

let nextId = 0;

const BookShelf = () => {
  const [content, setContent] = useState('');
  const [dataSource, setDataSource] = useState<BookItem[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const { data: session } = useSession();
  const authorId = (session == null) ? "" : session.user?.id;

  useEffect(() => {
    if (authorId != "") {
      selectBookItem();
    }
  }, [authorId]);

  const selectBookItem = async () => {
    const response = await fetch(`/api/bookItem?id=${authorId}`, {
      method: 'GET',
    });
    const bookItems = await response.json();
    setDataSource(bookItems);
    let val = bookItems.map((value: { id: String; }) => Number(value.id))
    nextId = val.reduce((a: number, b: number) => a > b ? a : b)
    nextId = nextId + 1;
  };


  const updateBookItem = async (updatedRow: any) => {
    await fetch(`/api/bookItem`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedRow }),
    });
  };

  // 新規行追加ボタン
  const addBookItem = () => {
    let bookItem: BookItem = {
      id: String(nextId),
      title: "",
      volumeNumber: 1,
      memo: "",
      authorId: (authorId == undefined) ? null : authorId,
    };
    insertBookItem(bookItem)
    selectBookItem();
  };

  const insertBookItem = async (bookItem: BookItem) => {
    const add = await fetch(`/api/bookItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookItem }),
    });
  };

  const delRows = async () => {
    console.log(rowSelectionModel)
    rowSelectionModel.map(val => deleteBookItem(val))
    selectBookItem();
  };

  const deleteBookItem = async (id: GridRowId) => {
    const del = await fetch(`/api/bookItem`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
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
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          processRowUpdate={(updatedRow) =>
            updateBookItem(updatedRow)
          }
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>

      <Button variant="contained" color="primary" onClick={() => addBookItem()}>漫画追加</Button>
      <Button variant="contained" color='warning' onClick={() => delRows()}>
        削除
      </Button>
    </div>
  );
}

export default BookShelf;
