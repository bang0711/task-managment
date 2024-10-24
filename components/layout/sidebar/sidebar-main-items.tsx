'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';

import { navMain } from '@/constants';

import { ChevronRight } from 'lucide-react';

import { Link } from 'next-view-transitions';

import { usePathname } from 'next/navigation';

import React from 'react';

type Props = {
  teamId: string;
};

function SidebarMainItems({ teamId }: Props) {
  const pathname = usePathname();

  const isInDashboard = pathname === `/teams/${teamId}`;
  return (
    <SidebarMenu>
      {navMain.map((item) => (
        <Collapsible key={item.title} asChild className="group/collapsible">
          <SidebarMenuItem>
            {!item.items?.length ? (
              <SidebarMenuButton
                className={`${
                  isInDashboard && 'bg-sidebar-accent'
                } transition-all duration-300`}
                asChild
                tooltip={item.title}
              >
                <Link href={`/teams/${teamId}${item.url}`}>
                  {item.icon && <item.icon />}

                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            ) : (
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className="transition-all duration-300"
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>

                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            )}

            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem
                    className="transition-all duration-300"
                    key={subItem.title}
                  >
                    <SidebarMenuSubButton asChild>
                      <Link href={`/teams/${teamId}${subItem.url}`}>
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}

export default SidebarMainItems;
