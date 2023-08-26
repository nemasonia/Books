"use client";

import { useSession } from 'next-auth/react';
import Link from 'next/link'

const headerLink = () => {
  const { data: session } = useSession();
  return (
    <>
      {
        // セッションがある場合は、リンクを表示する
        session && (
          <>
            <ul>
              <li><Link href="/">top</Link></li>
              <li><Link href="/BookShelf">本棚</Link></li>
            </ul>
            <p>{session.user?.name}</p>
          </>
        )
      }
      {
        // セッションがない場合は、なし
        !session && (
          <></>
        )
      }
    </>
  );
};

export default headerLink;