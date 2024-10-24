'use client';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarMenuButton } from '@/components/ui/sidebar';

import { ThemeSwitcherButton } from '../ThemeToggle/theme-switch-button';

import { userOptions } from '@/constants';

import { Link } from 'next-view-transitions';

import { signOut, useSession } from 'next-auth/react';

import { ChevronsUpDown, LogOut } from 'lucide-react';

type Props = {};

function UserActions({}: Props) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user?.image ?? ''}
              alt={session.user?.name ?? ''}
            />
            <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{session.user?.name}</span>
            <span className="truncate text-xs">{session.user?.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="flex items-center gap-2 p-0 px-1 py-1.5 font-normal">
          <div className="flex-1 gap-2 space-y-1 text-left text-sm">
            <div className="flex items-center gap-1">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session.user?.image ?? ''}
                  alt={session.user?.name ?? ''}
                />
                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <span className="truncate font-semibold">
                {session.user?.name}
              </span>
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-xs">{session.user?.email}</span>
            </div>
          </div>
          <ThemeSwitcherButton />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {userOptions.map((option) => (
            <DropdownMenuItem key={option.title}>
              <Link
                className="flex w-full items-center gap-2"
                href={option.href}
              >
                <option.icon size={16} />
                <span>{option.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => signOut()}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserActions;
