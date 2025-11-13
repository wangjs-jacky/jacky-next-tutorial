// app/streaming-demo/page.tsx
import { Suspense } from 'react';

// 模拟不同延迟的数据获取
async function fetchFastData() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { title: "快速数据", content: "这个数据加载很快（0.5秒）" };
}

async function fetchMediumData() {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { title: "中等速度数据", content: "这个数据加载中等（1.5秒）" };
}

async function fetchSlowData() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return { title: "慢速数据", content: "这个数据加载很慢（3秒）" };
}

// 骨架屏组件
function FastSkeleton() {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
    </div>
  );
}

function MediumSkeleton() {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  );
}

function SlowSkeleton() {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      </div>
    </div>
  );
}

// 数据展示组件
async function FastDataComponent() {
  const data = await fetchFastData();
  return (
    <div className="p-4 border border-green-500 dark:border-green-400 rounded-lg bg-green-50 dark:bg-green-900/20">
      <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
        {data.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{data.content}</p>
    </div>
  );
}

async function MediumDataComponent() {
  const data = await fetchMediumData();
  return (
    <div className="p-4 border border-yellow-500 dark:border-yellow-400 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
      <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
        {data.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{data.content}</p>
    </div>
  );
}

async function SlowDataComponent() {
  const data = await fetchSlowData();
  return (
    <div className="p-4 border border-red-500 dark:border-red-400 rounded-lg bg-red-50 dark:bg-red-900/20">
      <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
        {data.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{data.content}</p>
    </div>
  );
}

export default function StreamingDemoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Streaming 和 Loading 演示</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          观察不同部分如何逐步加载，而不是等待所有内容
        </p>
      </div>

      {/* 立即显示的部分 */}
      <div className="p-6 border border-blue-500 dark:border-blue-400 rounded-lg bg-blue-50 dark:bg-blue-900/20">
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
          立即显示的内容
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          这部分内容不需要等待数据，会立即显示。下面的三个部分会通过 Streaming 逐步加载。
        </p>
      </div>

      {/* 使用 Suspense 实现细粒度 Streaming */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">逐步加载的内容</h2>
        
        {/* 快速数据 - 0.5秒后显示 */}
        <Suspense fallback={<FastSkeleton />}>
          <FastDataComponent />
        </Suspense>

        {/* 中等速度数据 - 1.5秒后显示 */}
        <Suspense fallback={<MediumSkeleton />}>
          <MediumDataComponent />
        </Suspense>

        {/* 慢速数据 - 3秒后显示 */}
        <Suspense fallback={<SlowSkeleton />}>
          <SlowDataComponent />
        </Suspense>
      </div>

      {/* 说明文档 */}
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">工作原理说明</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. Streaming（流式渲染）</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>服务器不会等待所有数据准备好</li>
              <li>每个 Suspense 边界独立渲染和传输</li>
              <li>数据准备好一部分就发送一部分</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">2. Loading（加载状态）</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>Suspense 的 fallback 属性定义了加载状态</li>
              <li>在数据加载期间显示骨架屏</li>
              <li>数据准备好后自动替换为实际内容</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">3. 时间线</h4>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded font-mono text-sm">
              <div>0.0s - 显示"立即显示的内容"和三个骨架屏</div>
              <div>0.5s - 快速数据加载完成，显示绿色框</div>
              <div>1.5s - 中等速度数据加载完成，显示黄色框</div>
              <div>3.0s - 慢速数据加载完成，显示红色框</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

