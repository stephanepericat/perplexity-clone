import Image from 'next/image'
import Logo from '@/public/word-mark.png'
import { cn } from '@/lib/utils'

import {
  Atom,
  AudioLines,
  Cpu,
  Globe,
  Mic,
  Paperclip,
  SearchCheck,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AIModelOptions } from '@/lib/shared'

export const ChatInputBox = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Image src={Logo} alt="Perplexity" className="max-w-72 mb-6" />
      <div className="w-full p-2 max-w-2xl border-2 rounded-2xl relative">
        <Tabs defaultValue="search" className="w-full">
          <TabsContent value="search">
            <Input
              className={cn(
                'focus-visible:border-none focus-visible:ring-none focus-visible:ring-0 border-none shadow-none',
                'w-full my-2',
              )}
              placeholder="Ask anything..."
            />
          </TabsContent>
          <TabsContent value="research">
            <Input
              className={cn(
                'focus-visible:border-none focus-visible:ring-none focus-visible:ring-0 border-none shadow-none',
                'w-full my-2',
              )}
              placeholder="Research anything..."
            />
          </TabsContent>
          <TabsList>
            <TabsTrigger value="search" className="text-primary">
              <SearchCheck /> Search
            </TabsTrigger>
            <TabsTrigger value="research" className="text-primary">
              <Atom /> Research
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center absolute right-2 bottom-2 h-[36px]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3">
                <Cpu className="text-muted-foreground h-5 w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              {AIModelOptions.map((model) => (
                <DropdownMenuItem key={model.id}>
                  <div className="mb-1">
                    <h2 className="text-sm font-medium">{model.name}</h2>
                    <p className="w-[250px] truncate text-muted-foreground">
                      {model.description}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost">
            <Globe className="text-muted-foreground h-5 w-5" />
          </Button>
          <Button variant="ghost">
            <Paperclip className="text-muted-foreground h-5 w-5" />
          </Button>
          <Button variant="ghost">
            <Mic className="text-muted-foreground h-5 w-5" />
          </Button>
          <Button>
            <AudioLines className="text-white h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
