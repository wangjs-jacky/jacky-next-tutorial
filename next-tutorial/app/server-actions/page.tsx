"use client";

import { useState, useTransition } from "react";
import { createUser, incrementCounter } from "./actions";

export default function ServerActionsPage() {
  const [result, setResult] = useState<any>(null);
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const response = await createUser(formData);
    setResult(response);
  };

  const handleIncrement = () => {
    startTransition(async () => {
      const newCount = await incrementCounter(count);
      setCount(newCount);
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Server Actions 演示</h1>

      {/* 表单示例 */}
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">创建用户（表单提交）</h2>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">姓名</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">邮箱</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            提交
          </button>
        </form>

        {result && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-800 dark:text-green-200">{result.message}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              ID: {result.id}
            </p>
          </div>
        )}
      </div>

      {/* 计数器示例 */}
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">计数器（useTransition）</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleIncrement}
            disabled={isPending}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isPending ? "处理中..." : "增加"}
          </button>
          <span className="text-2xl font-bold">计数: {count}</span>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Server Actions 说明</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Server Actions 是 Next.js 13+ 的新功能</li>
          <li>使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">"use server"</code> 指令标记</li>
          <li>可以直接在服务端执行，无需 API 路由</li>
          <li>支持表单提交和客户端调用</li>
          <li>可以使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">useTransition</code> 处理加载状态</li>
          <li>自动处理序列化和反序列化</li>
        </ul>
      </div>
    </div>
  );
}

