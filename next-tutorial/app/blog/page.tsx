import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客",
  description: "博客文章列表",
};

// 模拟博客文章数据
const posts = [
  {
    id: 1,
    slug: "getting-started-with-nextjs",
    title: "Next.js 入门指南",
    excerpt: "学习如何使用 Next.js 构建现代化的 Web 应用",
    date: "2024-01-15",
    author: "张三",
  },
  {
    id: 2,
    slug: "app-router-deep-dive",
    title: "App Router 深入解析",
    excerpt: "深入了解 Next.js App Router 的工作原理",
    date: "2024-01-20",
    author: "李四",
  },
  {
    id: 3,
    slug: "server-components-vs-client-components",
    title: "服务端组件 vs 客户端组件",
    excerpt: "理解何时使用服务端组件和客户端组件",
    date: "2024-01-25",
    author: "王五",
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">博客</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          这里展示了如何使用 App Router 构建博客功能
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {post.excerpt}
            </p>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">博客功能说明</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>使用动态路由显示文章详情</li>
          <li>支持 SEO 友好的 URL（slug）</li>
          <li>可以集成 CMS 或数据库</li>
          <li>支持静态生成（SSG）和服务器渲染（SSR）</li>
        </ul>
      </div>
    </div>
  );
}

