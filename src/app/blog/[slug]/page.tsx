import { getPost } from "@/data/blog";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Suspense } from "react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanityClient"; // Import the urlFor function
import Image from 'next/image'; // Import the Image component from next/image

const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value) return null;
      const imageUrl = urlFor(value).url(); // Ensure this returns a valid URL
      return (
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
          <Image
            src={imageUrl}
            alt={value.alt || "Blog image"}
            fill // Use fill to make the image responsive
            style={{ objectFit: 'cover' }} // Ensure the image covers the container
          />
        </div>
      );
    },
  },
};

export default async function Blog({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="blog">
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
          </p>
          {post.authorName && (
            <div className="flex items-center mt-[0px]">
              <p className="text-sm text-muted-foreground">
                By {post.authorName}
              </p>
            </div>
          )}
        </Suspense>
      </div>
      <article className="prose dark:prose-invert">
        <PortableText value={post.body} components={components} />
      </article>
    </section>
  );
}
