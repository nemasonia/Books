import { TextField } from "@mui/material"

export const NameTextField = () => {
  return (
    <TextField
      name="name"
      label="アカウント名"
      sx={{ display: "flex", maxWidth: 360 }}
      helperText="日本語、英数字、記号で入力"
      margin="normal"
    />
  );
};

