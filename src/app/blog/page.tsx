import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { format } from "date-fns";
import { urlFor } from "@/lib/sanityClient"; // Ensure this import is correct
import Image from 'next/image'; // Import the Image component

interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string; // ISO 8601 date string
  authorName?: string;
  authorImage?: any; // Replace with a more specific type if possible
}

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  try {
    const posts: BlogPost[] = await getBlogPosts();

    if (!posts || posts.length === 0) {
      return <p>No blog posts found.</p>;
    }

    return (
      <section>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog</h1>
        </BlurFade>
        {posts.map((post: BlogPost, id: number) => {
          const date = new Date(post.publishedAt);
          if (isNaN(date.getTime())) {
            console.error(`Invalid date format for: ${post.publishedAt}`);
            return null;
          }

          return (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link className="flex flex-col space-y-1 mb-4" href={`/blog/${post.slug}`}>
                <div className="w-full flex flex-col">
                  <p className="tracking-tight">{post.title}</p>
                  <p className="h-6 text-xs text-muted-foreground">
                    {format(date, "MMMM dd, yyyy")}
                  </p>
                  <div className="flex items-center gap-2">
                    {post.authorImage && (
                      <div className="relative" style={{ width: '32px', height: '32px' }}>
                        <Image
                          src={urlFor(post.authorImage).url()} // Ensure URL is correctly built
                          alt={post.authorName || "Author image"}
                          className="rounded-full"
                          fill // Use fill to cover the parent div
                          style={{ objectFit: 'cover' }} // Maintain aspect ratio
                        />
                      </div>
                    )}
                    {post.authorName && (
                      <p className="text-xs text-muted-foreground">
                        By {post.authorName}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </BlurFade>
          );
        })}
      </section>
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return <p>Failed to load blog posts.</p>;
  }
}
