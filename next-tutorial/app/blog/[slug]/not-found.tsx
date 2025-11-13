import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-6 py-12">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">文章未找到</h2>
      <p className="text-gray-600 dark:text-gray-400">
        抱歉，您访问的文章不存在。
      </p>
      <Link
        href="/blog"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        返回博客列表
      </Link>
    </div>
  );
}

