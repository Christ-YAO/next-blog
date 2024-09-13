import path from "path";
import fs from "fs";
import { Post, PostMeta } from "../types/post";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import rehypePrism from "rehype-prism-plus";

const postDirectory = path.join(process.cwd(), "content");

export const getSortedPostsData = (): PostMeta[] => {
  // Get file names under /posts
  const fileNames = fs
    .readdirSync(postDirectory)
    .filter((f) => f.endsWith(".mdx"));

  const allPostsData: PostMeta[] = fileNames.map((fileName) => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    // Read markdown file as string
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as Omit<PostMeta, "id">),
    };
  });

  return allPostsData;
};

export type PostSlugParams = {
  params: {
    slug: string;
  };
};

export const getPostsSlugs = (): PostSlugParams[] => {
  return getSortedPostsData().map((post) => {
    return {
      params: {
        slug: post.id,
      },
    };
  });
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const fullPath = path.join(postDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { code, frontmatter } = await bundleMDX({
    source: fileContents,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];

      return options;
    },
  });

  return {
    id: slug,
    code,
    frontmatter: frontmatter as PostMeta,
  };
};
