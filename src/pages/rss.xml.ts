import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getPublishedPosts } from '../lib/posts';

export async function GET(context: APIContext) {
    const posts = await getPublishedPosts();
    return rss({
        title: `${site.mark} writing`,
        description: 'Notes on backend work, APIs, debugging, security and learning cloud infrastructure, by Sibongakonke Simamane.',
        site: context.site ?? site.origin,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: `/writing/${post.id}/`,
        })),
    });
}
