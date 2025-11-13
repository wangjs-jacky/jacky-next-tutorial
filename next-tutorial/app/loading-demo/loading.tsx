// 加载状态组件
export default function Loading() {
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
        <h3 className="text-lg font-semibold mb-2">loading.tsx 说明</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>创建 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">loading.tsx</code> 文件可以显示加载状态</li>
          <li>在页面加载时自动显示</li>
          <li>支持 Suspense 边界</li>
          <li>可以使用任何 UI 组件展示加载状态</li>
        </ul>
      </div>
    </div>
  );
}

