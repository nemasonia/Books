import { GridColDef, GridValueSetterParams } from '@mui/x-data-grid';

export const booksItemCol: GridColDef[] = [
  {
    field: 'title',
    headerName: 'タイトル',
    width: 100,
    editable: true,
  },
  {
    field: 'volumeNumber',
    headerName: '巻数',
    width: 90,
    editable: true,
  },
  {
    field: 'memo',
    headerName: 'メモ',
    width: 150,
    editable: true,
  },

];