import type { PostType } from './blog'

export interface ArchiveType {
  year: number,
  list: PostType[]
}