'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  ArrowUpRight,
  Compass,
  GalleryHorizontalEnd,
  LogIn,
  Search,
  Smartphone,
} from 'lucide-react'
import SidebarLogo from '@/public/logo-sidebar.png'

import { cn } from '@/lib/utils'

import { SignUpButton } from '@clerk/nextjs'
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
import { Separator } from '@/components/ui/separator'

const MenuOptions = [
  { title: 'Home', icon: Search, path: '/' },
  { title: 'Discover', icon: Compass, path: '/discover' },
  { title: 'Library', icon: GalleryHorizontalEnd, path: '/library' },
  { title: 'Sign In', icon: LogIn, path: '/sign-in' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="items-center">
        <Image src={SidebarLogo} alt="Logo" width={180} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="pt-5">
          <SidebarMenu>
            {MenuOptions.map(({ title, icon: Icon, path }, index) => (
              <SidebarMenuItem key={index} className="p-1">
                <SidebarMenuButton
                  className={cn(
                    'hover:bg-transparent active:bg-transparent hover:font-semibold',
                    pathname === path && 'font-semibold',
                  )}
                >
                  <Link href={path} className="flex items-center gap-2 w-full">
                    <Icon className="h-5" />
                    <span className="text-lg">{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SignUpButton mode="modal">
            <Button className="rounded-full text-lg py-[1.35rem] hover:cursor-pointer">
              Sign Up
            </Button>
          </SignUpButton>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="">
        <div>
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
        <Separator className="mt-3 bg-accent brightness-90" />
        <div className="my-3">
          <a href="#" className="flex items-center gap-1.5">
            <Smartphone className="h-4 w-4" />
            <span className="text-sm">Download</span>
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
