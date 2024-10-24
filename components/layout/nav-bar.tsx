'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import UserNav from './user-nav';
import ThemeToggle from './ThemeToggle/theme-toggle';
type Props = {};

function Navbar({}: Props) {
  const { data: session } = useSession();
  if (session) {
    return (
      <nav className="flex items-center justify-end gap-2 px-3 py-2">
        <UserNav session={session} />

        <ThemeToggle />
      </nav>
    );
  }
}

export default Navbar;
