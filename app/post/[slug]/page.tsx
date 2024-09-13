import { Layout } from "@/components/ui/Layout";
import { MDXComponent } from "@/components/ui/MDXComponent";
import { getPostBySlug, getPostsSlugs, PostSlugParams } from "@/lib/post";
import { NextPage } from "next";
import Link from "next/link";

import { House } from "lucide-react";

const Page: NextPage<PostSlugParams> = async ({ params }: PostSlugParams) => {
    const slug = params.slug;
    const post = await getPostBySlug(slug);
    return (
        <Layout>
            <Link href="/" className="inline-block bg-accent/10 hover:bg-accent/30 transition-all p-2 rounded-full mb-10">
            <House size={20} strokeWidth={"1.2px"} />
            </Link>
            <h1 className="font-bold text-2xl">{post.frontmatter.title}</h1>
            <div className="h-1 w-10 bg-accent"></div>
            <article className="prose mt-4 bg-accent/10 p-2 shadow-sm">
                <MDXComponent code={post.code} />
            </article>
        </Layout>
    );
}

export const getStaticPaths = async () => {
    const slugs = await getPostsSlugs();

    return {
        paths: slugs,
        fallback: false
    }
}

export default Page