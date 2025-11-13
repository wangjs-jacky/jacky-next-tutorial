import type { Metadata } from "next";

// 静态页面的元数据
export const metadata: Metadata = {
  title: "关于我们",
  description: "这是一个静态页面示例",
};

// 这是一个静态页面（服务端组件）
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">关于我们</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        这是一个静态页面示例。在 App Router 中，所有组件默认都是服务端组件。
      </p>
      
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">服务端组件特点</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>默认在服务端渲染</li>
          <li>可以直接访问后端资源（数据库、API等）</li>
          <li>不会增加客户端 JavaScript 包大小</li>
          <li>可以安全地使用敏感信息（API keys等）</li>
          <li>支持 async/await 数据获取</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">静态路由</h2>
        <p>
          这个页面位于 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">app/about/page.tsx</code>，
          对应路由 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/about</code>。
        </p>
      </div>
    </div>
  );
}

