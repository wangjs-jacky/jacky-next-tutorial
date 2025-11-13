import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

// 模拟博客文章数据
const posts: Record<
  string,
  {
    title: string;
    content: string;
    author: string;
    date: string;
  }
> = {
  "getting-started-with-nextjs": {
    title: "Next.js 入门指南",
    content: `
      Next.js 是一个强大的 React 框架，提供了许多开箱即用的功能。

      ## 主要特性

      - **服务端渲染**：提高性能和 SEO
      - **静态生成**：预渲染页面
      - **API 路由**：构建全栈应用
      - **文件系统路由**：自动路由生成

      ## 开始使用

      使用 create-next-app 快速创建项目：

      \`\`\`bash
      npx create-next-app@latest
      \`\`\`
    `,
    author: "张三",
    date: "2024-01-15",
  },
  "app-router-deep-dive": {
    title: "App Router 深入解析",
    content: `
      App Router 是 Next.js 13+ 引入的新路由系统。

      ## 核心概念

      - **布局**：共享 UI 组件
      - **页面**：路由段
      - **加载状态**：显示加载 UI
      - **错误处理**：捕获错误

      ## 优势

      App Router 提供了更好的开发体验和性能优化。
    `,
    author: "李四",
    date: "2024-01-20",
  },
  "server-components-vs-client-components": {
    title: "服务端组件 vs 客户端组件",
    content: `
      理解服务端组件和客户端组件的区别很重要。

      ## 服务端组件

      - 默认在服务端渲染
      - 可以直接访问后端资源
      - 不会增加客户端包大小

      ## 客户端组件

      - 使用 "use client" 指令
      - 支持交互和浏览器 API
      - 会增加客户端包大小
    `,
    author: "王五",
    date: "2024-01-25",
  },
};

// 动态生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

// 生成静态路径（可选，用于静态生成）
export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/blog"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← 返回博客列表
      </Link>

      <header className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>作者: {post.author}</span>
          <span>日期: {post.date}</span>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">动态路由说明</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">[slug]</code> 创建动态路由</li>
          <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">generateMetadata</code> 动态生成 SEO 元数据</li>
          <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">generateStaticParams</code> 预生成静态页面</li>
          <li>支持服务端数据获取</li>
        </ul>
      </div>
    </article>
  );
}

