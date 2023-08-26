"use client";

import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";

// ログインボタン
export const LoginButton = () => {
  return (
    <Button variant="contained" color="primary" onClick={() => signIn()}>
      Sign in
    </Button>
  );
};

// ログアウトボタン
export const LogoutButton = () => {
  return (
    <Button variant="contained" color="primary" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};
