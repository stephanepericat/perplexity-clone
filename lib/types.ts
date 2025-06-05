export type FormattedResult = {
  description?: string
  img?: string
  long_name?: string
  thumbnail?: string
  title?: string
  url?: string
}

export type LibraryRecord = {
  id: string
  created_at: string
  type: string
  search_input: string
  user_email: string
  search_id: string
}

export type Chat = {
  id: number
  search_id: string
  created_at: string
  ai_response?: string
  search_results: SearchResult[]
  user_search_input?: string
}

export type SearchResult = {
  img: string
  url: string
  title: string
  long_name: string
  description: string
  thumbnail?: string
}

export type InputRecord = LibraryRecord & { Chats: Chat[] }
