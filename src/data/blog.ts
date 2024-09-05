import { client } from '@/lib/sanityClient';

export async function getBlogPosts() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    metadesc,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image,
    mainImage
  }`;

  return await client.fetch(query);
}

export async function getPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    title,
    metadesc,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image,
    mainImage
  }`;

  return await client.fetch(query, { slug });
}
