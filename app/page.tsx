import { getSortedPostsData } from "@/lib/post";
import Link from "next/link";

export default async function Home() {
  const posts = await getSortedPostsData();

  return (
    <div className="w-full min-h-screen px-4 pb-20 pt-12 md:pt-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 max-w-md mx-auto">
        <h1 className="text-2xl md:text-4xl md:text-center">~ Blog of Christ-YAO ~</h1>
        <div>
          {posts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <div className="my-4 block group hover:bg-accent/10 px-4 py-2 rounded transition-all">
                <p className="group-hover:underline transition-all font-medium">{post.title}</p>
                <p className="text-sm text-muted-foreground">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}