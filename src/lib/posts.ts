import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
    const posts = await getCollection('blog', ({ data }) => {
        if (import.meta.env.PROD && data.draft) {
            return false;
        }
        return true;
    });

    return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
