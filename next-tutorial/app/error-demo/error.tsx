"use client";

import { useEffect } from "react";

// 错误边界组件
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 可以在这里记录错误到错误监控服务
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto text-center space-y-6 py-12">
      <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
        出错了！
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        {error.message || "发生了一个未知错误"}
      </p>
      
      {error.digest && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">错误摘要 (Digest):</p>
          <code className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
            {error.digest}
          </code>
        </div>
      )}
      
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        重试
      </button>
      
      <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
        <h3 className="text-lg font-semibold mb-2">error.tsx 说明</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>创建 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">error.tsx</code> 文件可以捕获错误</li>
          <li>必须是客户端组件（使用 "use client"）</li>
          <li>接收 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">error</code> 和 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">reset</code> props</li>
          <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">error.digest</code> 是 Next.js 自动生成的错误摘要，用于错误追踪</li>
          <li><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">reset</code> 函数可以重试渲染</li>
        </ul>
      </div>
    </div>
  );
}

