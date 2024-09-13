export type PostMeta = {
    id: string
    title: string
    description: string
    author: string
}

export type Post = {
    metadata: PostMeta
    content: string
}