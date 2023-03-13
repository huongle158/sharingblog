export interface Blog {
    slug: string,
    title: string,
    content: string,
    banner: string,
    tagList: string[],
    createdAt: string,
    updatedAt?: string,
    author: {
        avatar: string,
        bio: string,
        email?: string,
        fullname: string,
        id: number,
        username?: string,
    }
    favoritesCount: number,
    commentCount: number
}