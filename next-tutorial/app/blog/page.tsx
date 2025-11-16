import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "博客",
  description: "博客文章列表",
};

// 获取所有博客文章
async function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const slugs = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const module = await import(`@/content/blog/${slug}.mdx`);
        return {
          slug,
          metadata: module.metadata,
        };
      } catch {
        return null;
      }
    })
  );

  return posts.filter((post): post is { slug: string; metadata: { title: string; author: string; date: string } } => post !== null);
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  // 按日期排序（最新的在前）
  posts.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">博客</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          这里展示了如何使用 App Router 和 Next.js 原生 MDX 支持构建博客功能
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">
              {post.metadata.title}
            </h2>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-4">
              <span>{post.metadata.author}</span>
              <span>{post.metadata.date}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">博客功能说明</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.mdx</code> 文件存储博客内容</li>
          <li>使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">export const metadata</code> 导出元信息</li>
          <li>Next.js 原生支持 MDX，无需额外渲染库</li>
          <li>支持动态路由显示文章详情</li>
          <li>支持静态生成（SSG）优化性能</li>
        </ul>
      </div>
    </div>
  );
}

