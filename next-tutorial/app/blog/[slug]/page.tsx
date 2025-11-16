import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

// 获取所有博客文章的 slug
function getAllPostSlugs(): string[] {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

// 动态生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const { metadata: postMetadata } = await import(
      `@/content/blog/${slug}.mdx`
    );
    
    return {
      title: postMetadata.title,
      description: `作者: ${postMetadata.author} | 日期: ${postMetadata.date}`,
    };
  } catch {
    return {
      title: "文章未找到",
    };
  }
}

// 生成静态路径（用于静态生成）
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export const dynamicParams = false;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let Post;
  let postMetadata;
  
  try {
    const module = await import(`@/content/blog/${slug}.mdx`);
    Post = module.default;
    postMetadata = module.metadata;
  } catch (error) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span>作者: {postMetadata.author}</span>
          <span>日期: {postMetadata.date}</span>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <Post />
      </div>

    </article>
  );
}

