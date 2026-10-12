import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<Post[]> {
    const posts = await getCollection('blog', ({ data }) => {
        if (import.meta.env.PROD && data.draft) {
            return false;
        }
        return true;
    });

    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/** Whole minutes to read, at ~200 words per minute, never less than 1. */
export function readingTime(post: Post): number {
    const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

/** Newer and older neighbours of a post in a newest-first list. */
export function getAdjacent(posts: Post[], id: string): { newer?: Post; older?: Post } {
    const i = posts.findIndex((p) => p.id === id);
    if (i === -1) return {};
    return { newer: posts[i - 1], older: posts[i + 1] };
}
