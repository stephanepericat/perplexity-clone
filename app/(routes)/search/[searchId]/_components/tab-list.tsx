import {
  ArrowUpRight,
  LucideImage,
  LucideList,
  LucideSparkles,
  LucideVideo,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const tabs = [
  {
    label: 'Answer',
    icon: LucideSparkles,
  },
  {
    label: 'Images',
    icon: LucideImage,
  },
  {
    label: 'Videos',
    icon: LucideVideo,
  },
  {
    label: 'Sources',
    icon: LucideList,
    badge: '10',
  },
]

export function TabList({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  return (
    <div className="flex items-center space-x-6 border-b border-muted-foreground pb-2 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={cn(
            'flex items-center gap-1 relative text-sm font-medium text-muted-foreground hover:text-black',
            activeTab === tab.label ? 'text-black' : '',
          )}
          onClick={() => setActiveTab(tab.label)}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
          {tab.badge && (
            <span className="ml-1 text-xs bg-gray-100 text-muted-foreground px-1.5 py-0.5 rounded-full">
              {tab.badge}
            </span>
          )}
          {activeTab === tab.label && (
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded"></span>
          )}
        </button>
      ))}
      <div className="ml-auto text-sm text-muted-foreground flex items-center gap-1">
        1 task <ArrowUpRight size={14} />
      </div>
    </div>
  )
}
