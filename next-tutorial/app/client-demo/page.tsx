"use client";

import { useState, useEffect } from "react";

export default function ClientDemoPage() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">客户端组件演示</h1>

      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">交互式计数器</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount(count - 1)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            -
          </button>
          <span className="text-3xl font-bold min-w-[100px] text-center">
            {count}
          </span>
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">实时时钟</h2>
        <p className="text-4xl font-mono text-center">{time}</p>
      </div>

      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">输入框示例</h2>
        <InputDemo />
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">客户端组件说明</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">"use client"</code> 指令标记</li>
          <li>可以使用 React Hooks（useState、useEffect 等）</li>
          <li>支持浏览器 API（localStorage、window 等）</li>
          <li>支持事件处理（onClick、onChange 等）</li>
          <li>会增加客户端 JavaScript 包大小</li>
          <li>在客户端渲染和交互</li>
        </ul>
      </div>
    </div>
  );
}

function InputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入一些文字..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
      />
      <p className="text-gray-600 dark:text-gray-400">
        你输入了: <strong>{value || "(空)"}</strong>
      </p>
    </div>
  );
}

