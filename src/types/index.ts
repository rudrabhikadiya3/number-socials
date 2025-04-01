export interface Post {
  id: number
  number: number
  comments: Post[]
  username: string
  timestamp: string
}
