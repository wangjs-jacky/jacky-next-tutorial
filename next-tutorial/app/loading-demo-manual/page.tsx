// app/loading-demo-manual/page.tsx
import { Suspense } from 'react';

// 模拟异步数据获取
async function fetchData() {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    title: "加载完成！",
    content: "这是从服务器获取的数据",
  };
}

// 加载状态组件（手动定义）
function LoadingFallback() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-8"></div>
        
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">手动 Suspense 说明</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>不使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">loading.tsx</code></li>
          <li>手动使用 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Suspense</code> 组件</li>
          <li>通过 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">fallback</code> 属性定义加载状态</li>
          <li>效果与 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">loading.tsx</code> 相同</li>
        </ul>
      </div>
    </div>
  );
}

// 实际内容组件（异步）
async function PageContent() {
  const data = await fetchData();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">{data.content}</p>
      
      <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">加载状态演示</h2>
        <p>
          这个页面在加载时会显示手动定义的 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">LoadingFallback</code> 
          组件。由于我们模拟了 2 秒的延迟，你可以看到加载状态的效果。
        </p>
      </div>
    </div>
  );
}

// 主页面组件 - 手动使用 Suspense
export default function LoadingDemoManualPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PageContent />
    </Suspense>
  );
}

