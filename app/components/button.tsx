"use client";

import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import Link from 'next/link'

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

// アカウント作成ボタン
// ログアウトボタン
export const CreateAccountPage = () => {
  return (
    <Button variant="contained" color="primary" onClick={() => signIn()}>
      <Link href="/createAccountPage">アカウント作成</Link>
    </Button>
  );
};