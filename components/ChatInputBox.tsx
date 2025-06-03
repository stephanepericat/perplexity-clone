import Image from 'next/image'
import Logo from '@/public/home-logo.png'
import { cn } from '@/lib/utils'

import { Input } from './ui/input'

export const ChatInputBox = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Image src={Logo} alt="Perplexity" className="max-w-72 mb-3" />
      <div className="w-full p-1 max-w-2xl border-2 rounded-2xl">
        <Input
          className={cn(
            'focus-visible:border-none focus-visible:ring-none focus-visible:ring-0 border-none shadow-none',
            'w-full',
          )}
          placeholder="Ask anything..."
        />
      </div>
    </div>
  )
}
