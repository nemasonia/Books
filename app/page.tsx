'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import { NextPage } from 'next';
import { LoginButton, LogoutButton } from "@/components/button";

const Login: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      {
        // セッションがある場合は、プロファイルを表示する
        session && (
          <div>
            <p>アカウント名</p>
            <p>{session.user?.name}</p>
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
    </>
  );
};

export default Login;