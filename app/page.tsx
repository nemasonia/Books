'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import { NextPage } from 'next';
import { LoginButton, LogoutButton, CreateAccountPage } from "@/app/components/button";

const Login: NextPage = () => {
  const { data: session } = useSession();

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {
        // セッションがある場合は、プロファイルを表示する
        session && (
          <div>
            <h1>プロファイル</h1>
            <div>{session.user?.name}</div>
            <div>{session.user?.email}</div>
            <LogoutButton />
          </div>
        )
      }
      {
        // セッションがない場合は、ログインページに遷移する
        !session && (
          <div>
            <p>ログインして</p>
            <LoginButton />
          </div>
        )
      }
    </main>
  );
};

export default Login;