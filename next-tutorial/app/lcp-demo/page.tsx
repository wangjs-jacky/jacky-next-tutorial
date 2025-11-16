import LCPMonitor from './LCPMonitor';

export default function LCPDemoPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">LCP (Largest Contentful Paint) 演示</h1>
        <p className="text-gray-600 dark:text-gray-400">
          这个页面演示了 LCP 的测量过程和候选元素的变化
        </p>
      </div>

      {/* LCP 监控组件 */}
      <LCPMonitor />

      {/* 不同大小的内容元素，用于演示 LCP 候选变化 */}
      <div className="space-y-6">
        <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">小图片（可能成为初始 LCP 候选）</h2>
          <div className="bg-white dark:bg-gray-900 p-4 rounded">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              alt="小图片"
              className="w-full max-w-md rounded"
              data-lcp-candidate="small-image"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              尺寸：400×300，可能成为第一个 LCP 候选
            </p>
          </div>
        </section>

        <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">大文本块（可能成为 LCP 候选）</h2>
          <div className="bg-white dark:bg-gray-900 p-6 rounded">
            <h3 className="text-3xl font-bold mb-4" data-lcp-candidate="large-text">
              这是一个大标题，可能成为 LCP 候选元素
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              如果这个文本块在视口中的大小（width × height）足够大，它也可能成为 LCP 候选。
              文本块的大小取决于其渲染后的实际尺寸。
            </p>
          </div>
        </section>

        <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">延迟加载的大图片（会替换之前的 LCP 候选）</h2>
          <div className="bg-white dark:bg-gray-900 p-4 rounded">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop"
              alt="大图片"
              className="w-full rounded"
              data-lcp-candidate="large-image"
              loading="lazy"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              尺寸：1200×800，当这张图片加载完成后，如果它比之前的候选元素更大，就会成为新的 LCP 候选
            </p>
          </div>
        </section>

        <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">更大的图片（可能成为最终 LCP）</h2>
          <div className="bg-white dark:bg-gray-900 p-4 rounded">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=1200&fit=crop"
              alt="超大图片"
              className="w-full rounded"
              data-lcp-candidate="xlarge-image"
              loading="lazy"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              尺寸：1600×1200，如果这张图片是最大的，它将成为最终的 LCP 候选
            </p>
          </div>
        </section>

        <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">说明</h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong>LCP 候选元素类型：</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>图片元素（&lt;img&gt;）</li>
                <li>视频元素（&lt;video&gt;）</li>
                <li>带背景图片的元素</li>
                <li>包含文本的块级元素</li>
              </ul>
            </div>
            <div>
              <strong>LCP 计算停止条件：</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>用户开始交互（滚动、点击等）</li>
                <li>页面开始卸载（导航到其他页面）</li>
                <li>页面在后台超过 5 秒</li>
              </ul>
            </div>
            <div>
              <strong>观察要点：</strong>
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>页面加载时，观察 LCP 候选元素的变化</li>
                <li>注意每个候选元素的 renderTime 和 size</li>
                <li>最终的 LCP 值是所有候选中 renderTime 最大的那个</li>
                <li>尝试滚动页面，观察 LCP 是否停止更新</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

