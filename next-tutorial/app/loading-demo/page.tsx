// 模拟异步数据获取
async function fetchData() {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    title: "加载完成！",
    content: "这是从服务器获取的数据",
  };
}

export default async function LoadingDemoPage() {
  const data = await fetchData();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">{data.title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">{data.content}</p>
      
      <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">加载状态演示</h2>
        <p>
          这个页面在加载时会显示 <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">loading.tsx</code> 
          中的内容。由于我们模拟了 2 秒的延迟，你可以看到加载状态的效果。
        </p>
      </div>
    </div>
  );
}

