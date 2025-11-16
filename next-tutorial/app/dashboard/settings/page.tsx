export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">设置</h2>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="font-semibold mb-2">通知设置</h3>
          <p className="text-gray-600 dark:text-gray-400">管理您的通知偏好</p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="font-semibold mb-2">隐私设置</h3>
          <p className="text-gray-600 dark:text-gray-400">控制您的隐私选项</p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="font-semibold mb-2">账户设置</h3>
          <p className="text-gray-600 dark:text-gray-400">更新您的账户信息</p>
        </div>
      </div>
    </div>
  );
}

