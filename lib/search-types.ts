export interface BraveSearchResult {
  query: Query
  mixed: Mixed
  type: string
  videos: Videos
  web: Web
}

export interface Query {
  original: string
  show_strict_warning: boolean
  is_navigational: boolean
  is_news_breaking: boolean
  spellcheck_off: boolean
  country: string
  bad_results: boolean
  should_fallback: boolean
  postal_code: string
  city: string
  header_country: string
  more_results_available: boolean
  state: string
}

export interface Mixed {
  type: string
  main: Main[]
  top: unknown[]
  side: unknown[]
}

export interface Main {
  type: string
  index?: number
  all: boolean
}

export interface Videos {
  type: string
  results: Result[]
  mutated_by_goggles: boolean
}

export interface Result {
  type: string
  url: string
  title: string
  description: string
  video: Video
  meta_url: MetaUrl
  thumbnail: Thumbnail
  age?: string
  page_age?: string
}

export interface Video {
  duration?: string
  views?: number
  creator?: string
  publisher?: string
}

export interface MetaUrl {
  scheme: string
  netloc: string
  hostname: string
  favicon: string
  path: string
}

export interface Thumbnail {
  src: string
  original: string
}

export interface Web {
  type: string
  results: WebResult[]
  family_friendly: boolean
}

export interface WebResult {
  title: string
  url: string
  is_source_local: boolean
  is_source_both: boolean
  description: string
  page_age?: string
  profile: Profile
  language: string
  family_friendly: boolean
  type: string
  subtype: string
  is_live: boolean
  meta_url: WebResultMetaUrl
  age?: string
  extra_snippets?: string[]
  thumbnail?: WebResultThumbnail
}

export interface Profile {
  name: string
  url: string
  long_name: string
  img: string
}

export interface WebResultMetaUrl {
  scheme: string
  netloc: string
  hostname: string
  favicon: string
  path: string
}

export interface WebResultThumbnail {
  src: string
  original: string
  logo: boolean
}

export interface VideoResult {
  type: string
  url: string
  title: string
  description: string
  video: Video
  meta_url: MetaUrl
  thumbnail: Thumbnail
  age?: string
  page_age?: string
}

export interface Video {
  duration?: string
  views?: number
  creator?: string
  publisher?: string
}
