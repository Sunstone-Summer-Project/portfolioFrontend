import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ''),
  }));
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const postPath = path.join(process.cwd(), 'posts', `${params.slug}.mdx`);

  if (!fs.existsSync(postPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(postPath, 'utf8');
  const { content, data } = matter(fileContents);

  return (
    <section className="max-w-3xl mx-auto px-4 py-8 prose dark:prose-invert">
      <h1>{data.title}</h1>
      {data.date && (
        <p className="text-sm text-gray-500 mb-4">
          Published on {new Date(data.date).toLocaleDateString()}
        </p>
      )}
      {data.authorName && (
        <p className="text-sm text-muted-foreground mb-4">
          By {data.authorName}
        </p>
      )}
      {/* Display image if provided in frontmatter */}
      {data.image && (
        <img
          src={data.image}
          alt="Blog image"
          style={{ width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '1rem' }}
        />
      )}

      <MDXRemote source={content} />
    </section>
  );
}
