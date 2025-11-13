"use client";

import { useState } from "react";

export default function ErrorDemoPage() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("这是一个测试错误！");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">错误处理演示</h1>
      
      <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="mb-4">
          点击下面的按钮会触发一个错误，展示 error.tsx 的错误处理功能。
        </p>
        <button
          onClick={() => setShouldError(true)}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          触发错误
        </button>
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">错误处理说明</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>error.tsx 会捕获路由段及其子段中的错误</li>
          <li>错误边界会显示最近的 error.tsx</li>
          <li>可以使用 reset() 函数重试渲染</li>
          <li>错误边界不会捕获同一组件中的错误</li>
        </ul>
      </div>
    </div>
  );
}

