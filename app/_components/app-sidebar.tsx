'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'

import {
  ArrowUpRight,
  Compass,
  GalleryHorizontalEnd,
  LogIn,
  Search,
} from 'lucide-react'
import SidebarLogo from '@/public/logo-sidebar.png'

import { cn } from '@/lib/utils'

import { SignOutButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const MenuOptions = [
  { title: 'Home', icon: Search, path: '/', showSignedIn: true },
  { title: 'Discover', icon: Compass, path: '/discover', showSignedIn: true },
  {
    title: 'Library',
    icon: GalleryHorizontalEnd,
    path: '/library',
    showSignedIn: true,
  },
  { title: 'Sign In', icon: LogIn, path: '/sign-in', showSignedIn: false },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <Sidebar>
      <SidebarHeader className="items-center">
        <Image src={SidebarLogo} alt="Logo" width={180} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="pt-5">
          <SidebarMenu>
            {MenuOptions.map(
              ({ title, icon: Icon, path, showSignedIn }, index) => {
                if (!showSignedIn && user) return null

                return (
                  <SidebarMenuItem key={index} className="p-1">
                    <SidebarMenuButton
                      className={cn(
                        'hover:bg-transparent active:bg-transparent hover:font-semibold',
                        pathname === path && 'font-semibold',
                      )}
                    >
                      <Link
                        href={path}
                        className="flex items-center gap-2 w-full"
                      >
                        <Icon className="h-5" />
                        <span className="text-lg">{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              },
            )}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          {user ? (
            <SignOutButton>
              <Button className="rounded-full text-lg py-[1.35rem] hover:cursor-pointer">
                Logout
              </Button>
            </SignOutButton>
          ) : (
            <SignUpButton mode="modal">
              <Button className="rounded-full text-lg py-[1.35rem] hover:cursor-pointer">
                Sign Up
              </Button>
            </SignUpButton>
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="">
        <div className="flex flex-col">
          <div className="mb-3">
            <h2 className="font-bold text-sm">Try Pro</h2>
            <p className="text-sm text-foreground/60">
              Upgrade for image upload, smarter AI, and more Copilot.
            </p>
            <Button
              variant="outline"
              className="bg-accent brightness-90 mt-2 hover:cursor-pointer"
            >
              <span>Learn More</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          {user && (
            <div className="my-3">
              <UserButton />
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
