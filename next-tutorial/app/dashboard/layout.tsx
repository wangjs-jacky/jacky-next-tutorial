// Dashboard 布局 - 现在使用实际的路由路径
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-3xl font-bold">仪表盘</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          这是一个仪表盘示例，使用实际的路由路径 /dashboard。
        </p>
      </div>
      
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <a href="/dashboard" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          概览
        </a>
        <a href="/dashboard/settings" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          设置
        </a>
        <a href="/dashboard/analytics" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          分析
        </a>
      </div>

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}

