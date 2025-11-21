"use client";

import { useState, useTransition, useDeferredValue, useMemo } from "react";

// 模拟搜索函数
function search(query: string): string[] {
  const allItems = Array.from({ length: 1000 }, (_, i) => `项目 ${i + 1}`);
  if (!query) return [];
  return allItems.filter((item) => item.includes(query));
}

export default function TransitionDemoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-8">
      <h1 className="text-4xl font-bold mb-8">
        useTransition vs useDeferredValue 对比
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* useTransition 示例 */}
        <TransitionExample />

        {/* useDeferredValue 示例 */}
        <DeferredValueExample />
      </div>

      <ComparisonTable />
    </div>
  );
}

// useTransition 示例
function TransitionExample() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value); // 立即更新输入框（紧急）

    // 主动控制：延迟更新搜索结果（非紧急）
    startTransition(() => {
      setResults(search(value));
    });
  };

  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">useTransition</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">搜索（主动控制）</label>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="输入搜索关键词..."
          />
          {isPending && (
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
              ⏳ 搜索中...
            </p>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            结果数量: {results.length}
          </p>
          <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-2">
            {results.length === 0 ? (
              <p className="text-gray-400 text-sm">暂无结果</p>
            ) : (
              results.slice(0, 10).map((item, idx) => (
                <div key={idx} className="py-1 text-sm">
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// useDeferredValue 示例
function DeferredValueExample() {
  const [input, setInput] = useState("");
  const deferredInput = useDeferredValue(input); // 自动延迟 input 的更新

  // 使用延迟后的值进行搜索
  const results = useMemo(() => {
    return search(deferredInput);
  }, [deferredInput]);

  // 判断是否正在延迟（值不同表示正在延迟）
  const isPending = input !== deferredInput;

  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">useDeferredValue</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">搜索（自动延迟）</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)} // 立即更新
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            placeholder="输入搜索关键词..."
          />
          {isPending && (
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
              ⏳ 延迟更新中...
            </p>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            结果数量: {results.length}
          </p>
          <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-2">
            {results.length === 0 ? (
              <p className="text-gray-400 text-sm">暂无结果</p>
            ) : (
              results.slice(0, 10).map((item, idx) => (
                <div key={idx} className="py-1 text-sm">
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 对比表格
function ComparisonTable() {
  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">详细对比</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-3">特性</th>
              <th className="text-left p-3">useTransition</th>
              <th className="text-left p-3">useDeferredValue</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-medium">控制对象</td>
              <td className="p-3">状态更新操作</td>
              <td className="p-3">值的更新</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-medium">使用方式</td>
              <td className="p-3">主动调用 startTransition</td>
              <td className="p-3">自动延迟值更新</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-medium">返回内容</td>
              <td className="p-3">[isPending, startTransition]</td>
              <td className="p-3">延迟后的值</td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <td className="p-3 font-medium">适用场景</td>
              <td className="p-3">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>按钮点击触发</li>
                  <li>需要显示加载状态</li>
                  <li>Server Actions</li>
                  <li>需要控制更新时机</li>
                </ul>
              </td>
              <td className="p-3">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>输入框搜索</li>
                  <li>列表筛选</li>
                  <li>图表数据更新</li>
                  <li>值驱动的场景</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-medium">代码示例</td>
              <td className="p-3">
                <code className="text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded">
                  startTransition(() =&gt; setState())
                </code>
              </td>
              <td className="p-3">
                <code className="text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded">
                  useDeferredValue(value)
                </code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

