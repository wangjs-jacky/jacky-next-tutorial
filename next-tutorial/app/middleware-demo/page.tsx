import Link from "next/link";

export default function MiddlewareDemoPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">中间件演示</h1>
      
      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">中间件功能</h2>
        <p className="mb-4">
          打开浏览器开发者工具的网络标签，查看响应头，你会看到中间件添加的自定义头部。
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">x-custom-header</code>: middleware-header</li>
          <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">x-pathname</code>: 当前路径</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">中间件说明</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>中间件在请求完成之前运行</li>
          <li>可以修改请求和响应</li>
          <li>支持重定向和重写 URL</li>
          <li>可以用于身份验证、日志记录等</li>
          <li>文件位置：<code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">middleware.ts</code></li>
          <li>使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">config.matcher</code> 配置匹配规则</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">常见用例</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>身份验证和授权</li>
          <li>请求日志记录</li>
          <li>A/B 测试</li>
          <li>地理位置重定向</li>
          <li>请求头修改</li>
        </ul>
      </div>
    </div>
  );
}

