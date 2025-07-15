import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { format } from "date-fns";
import BlurFade from "@/components/magicui/blur-fade";

// Post interface for type safety
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  authorName?: string;
  image?: string;
}

const BLUR_FADE_DELAY = 0.04;

function getAllPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      authorName: data.authorName || "Unknown",
      image: data.image || null,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog</h1>
      </BlurFade>

      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        posts.map((post, index) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + index * 0.05} key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="flex flex-col space-y-1 mb-6">
              <div className="w-full flex flex-col">
                <p className="text-lg font-semibold tracking-tight">{post.title}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </p>
                {post.authorName && (
                  <p className="text-xs text-muted-foreground">
                    By {post.authorName}
                  </p>
                )}
              </div>
            </Link>
          </BlurFade>
        ))
      )}
    </section>
  );
}
