"use client";

import { useState } from "react";

export default function ApiDemoPage() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testGet = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hello?name=Next.js");
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "请求失败" });
    } finally {
      setLoading(false);
    }
  };

  const testPost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "Next.js", type: "POST" }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "请求失败" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">API 路由演示</h1>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={testGet}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            测试 GET
          </button>
          <button
            onClick={testPost}
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            测试 POST
          </button>
        </div>

        {loading && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            加载中...
          </div>
        )}

        {response && (
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">响应数据：</h3>
            <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">路由处理程序说明</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>在 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">app/api</code> 目录下创建路由处理程序</li>
          <li>文件名必须是 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">route.ts</code> 或 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">route.js</code></li>
          <li>导出 HTTP 方法函数：GET、POST、PUT、DELETE、PATCH 等</li>
          <li>返回 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">NextResponse</code> 对象</li>
          <li>支持异步操作和数据库访问</li>
        </ul>
      </div>
    </div>
  );
}

