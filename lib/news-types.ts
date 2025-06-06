export interface NewsResult {
  type: string
  title: string
  url: string
  description: string
  age: string
  page_age: string
  meta_url: MetaUrl
  thumbnail: Thumbnail
  extra_snippets?: string[]
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
}
