import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-6 py-12">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">产品未找到</h2>
      <p className="text-gray-600 dark:text-gray-400">
        抱歉，您访问的产品不存在。
      </p>
      <Link
        href="/products"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        返回产品列表
      </Link>
      
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
        <h3 className="text-lg font-semibold mb-2">not-found.tsx 说明</h3>
        <p>
          在 App Router 中，可以创建 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">not-found.tsx</code> 
          文件来处理 404 错误。当调用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">notFound()</code> 
          函数时，会显示这个页面。
        </p>
      </div>
    </div>
  );
}

