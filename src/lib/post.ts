import path from "path";
import fs from "fs";
import { PostMeta } from "../types/post";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "content");

export const getSortedPostsData = () => {
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
