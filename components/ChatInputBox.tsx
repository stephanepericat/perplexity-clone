import Image from 'next/image'
import Logo from '@/public/home-logo.png'
import { cn } from '@/lib/utils'

import { Atom, SearchCheck } from 'lucide-react'

import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
export const ChatInputBox = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Image src={Logo} alt="Perplexity" className="max-w-72 mb-3" />
      <div className="w-full p-2 max-w-2xl border-2 rounded-2xl">
        <Tabs defaultValue="search" className="w-[400px]">
          <TabsContent value="search">
            <Input
              className={cn(
                'focus-visible:border-none focus-visible:ring-none focus-visible:ring-0 border-none shadow-none',
                'w-full',
              )}
              placeholder="Ask anything..."
            />
          </TabsContent>
          <TabsContent value="research">
            <Input
              className={cn(
                'focus-visible:border-none focus-visible:ring-none focus-visible:ring-0 border-none shadow-none',
                'w-full',
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
      </div>
    </div>
  )
}
