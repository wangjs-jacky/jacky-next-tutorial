// app/hydration-demo/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function HydrationDemoPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello');
  const [hydrated, setHydrated] = useState(false);
  
  // 检测水合完成
  useEffect(() => {
    setHydrated(true);
    console.log('✅ 水合完成！应用现在可以交互了');
  }, []);
  
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">水合（Hydration）演示</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          观察服务端 HTML 如何与客户端 React 组件关联
        </p>
      </div>

      {/* 水合状态指示器 */}
      <div className={`p-4 rounded-lg ${
        hydrated 
          ? 'bg-green-50 dark:bg-green-900/20 border border-green-500' 
          : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-500'
      }`}>
        <p className="font-semibold">
          {hydrated ? '✅ 水合完成 - 应用可交互' : '⏳ 水合中...'}
        </p>
      </div>

      {/* 交互式计数器 */}
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">交互式计数器</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount(count - 1)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            disabled={!hydrated}
          >
            -
          </button>
          <span className="text-3xl font-bold min-w-[100px] text-center">
            {count}
          </span>
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            disabled={!hydrated}
          >
            +
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {hydrated 
            ? '✅ 按钮已绑定事件监听器，可以点击' 
            : '⏳ 等待水合完成...'}
        </p>
      </div>

      {/* 交互式输入框 */}
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">交互式输入框</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入一些文字..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          disabled={!hydrated}
        />
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          你输入了: <strong>{message || "(空)"}</strong>
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {hydrated 
            ? '✅ 输入框已绑定 onChange 事件，可以输入' 
            : '⏳ 等待水合完成...'}
        </p>
      </div>

      {/* 说明文档 */}
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">水合（Hydration）说明</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. 什么是水合？</h4>
            <p className="text-gray-600 dark:text-gray-400">
              水合是将服务端渲染的静态 HTML 与客户端的 React 组件关联起来的过程。
              它让静态 HTML 变成可交互的 React 应用。
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">2. 水合过程</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>服务端渲染 HTML（静态）</li>
              <li>客户端接收 HTML</li>
              <li>React 解析组件树</li>
              <li>建立 DOM 节点 ↔ React Fiber 节点关联</li>
              <li>添加事件监听器</li>
              <li>初始化组件状态</li>
              <li>完成水合，应用可交互</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">3. 如何关联？</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li><strong>React Fiber 架构</strong>：跟踪组件树结构</li>
              <li><strong>双向关联</strong>：DOM 节点 ↔ Fiber 节点</li>
              <li><strong>事件绑定</strong>：添加 onClick、onChange 等事件监听器</li>
              <li><strong>状态初始化</strong>：恢复组件的 useState 状态</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">4. 打开浏览器控制台</h4>
            <p className="text-gray-600 dark:text-gray-400">
              查看控制台输出，可以看到水合完成的日志。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

