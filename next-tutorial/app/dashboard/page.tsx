export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">仪表盘概览</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">总用户</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">总收入</h3>
          <p className="text-3xl font-bold">¥56,789</p>
        </div>
        <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">订单数</h3>
          <p className="text-3xl font-bold">890</p>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">路由说明</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>文件路径：<code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">app/dashboard/page.tsx</code></li>
          <li>实际路由：<code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/dashboard</code></li>
          <li>子路由：<code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/dashboard/analytics</code> 和 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/dashboard/settings</code></li>
        </ul>
      </div>
    </div>
  );
}

