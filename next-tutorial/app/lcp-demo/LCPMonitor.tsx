'use client';

import { useEffect, useState, useRef } from 'react';

interface LCPEntry {
  renderTime: number;
  size: number;
  element: string;
  url?: string;
  timestamp: number;
}

export default function LCPMonitor() {
  const [lcpEntries, setLCPEntries] = useState<LCPEntry[]>([]);
  const [currentLCP, setCurrentLCP] = useState<LCPEntry | null>(null);
  const [isStopped, setIsStopped] = useState(false);
  const observerRef = useRef<PerformanceObserver | null>(null);
  const stopReasonRef = useRef<string>('');

  useEffect(() => {
    // 检查浏览器是否支持 LCP API
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      console.warn('浏览器不支持 PerformanceObserver API');
      return;
    }

    try {
      // 创建 PerformanceObserver 来监听 LCP 事件
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime: number;
          size: number;
          element?: Element;
          url?: string;
        };

        // 获取元素信息
        let elementInfo = '未知元素';
        if (lastEntry.element) {
          const tagName = lastEntry.element.tagName.toLowerCase();
          const id = lastEntry.element.id;
          const className = lastEntry.element.className;
          const dataAttr = lastEntry.element.getAttribute('data-lcp-candidate');
          
          if (dataAttr) {
            elementInfo = `${tagName}[data-lcp-candidate="${dataAttr}"]`;
          } else if (id) {
            elementInfo = `${tagName}#${id}`;
          } else if (className) {
            elementInfo = `${tagName}.${className.split(' ')[0]}`;
          } else {
            elementInfo = tagName;
          }
        }

        const newEntry: LCPEntry = {
          renderTime: lastEntry.renderTime,
          size: lastEntry.size,
          element: elementInfo,
          url: lastEntry.url || undefined,
          timestamp: Date.now(),
        };

        setLCPEntries((prev) => [...prev, newEntry]);
        setCurrentLCP(newEntry);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      observerRef.current = observer;

      // 监听用户交互，LCP 会在用户交互后停止更新
      const handleInteraction = () => {
        if (!isStopped) {
          setIsStopped(true);
          stopReasonRef.current = '用户交互（滚动/点击等）';
          observer.disconnect();
        }
      };

      // 监听页面卸载
      const handleUnload = () => {
        if (!isStopped) {
          setIsStopped(true);
          stopReasonRef.current = '页面卸载';
          observer.disconnect();
        }
      };

      // 监听页面可见性变化（页面进入后台超过 5 秒会停止 LCP）
      let hiddenTime: number | null = null;
      const handleVisibilityChange = () => {
        if (document.hidden) {
          hiddenTime = Date.now();
        } else {
          hiddenTime = null;
        }
      };

      // 定期检查页面是否在后台超过 5 秒
      const checkBackgroundTime = setInterval(() => {
        if (hiddenTime && Date.now() - hiddenTime > 5000) {
          if (!isStopped) {
            setIsStopped(true);
            stopReasonRef.current = '页面在后台超过 5 秒';
            observer.disconnect();
          }
          clearInterval(checkBackgroundTime);
        }
      }, 1000);

      // ============================================
      // 事件监听器说明：
      // ============================================
      // 
      // 1. window vs document 的区别：
      //    - window: 代表浏览器窗口，适合监听窗口级别的事件（滚动、卸载等）
      //    - document: 代表文档对象，适合监听文档级别的事件（可见性变化等）
      //
      // 2. passive: true 的含义：
      //    - 告诉浏览器这个事件监听器不会调用 preventDefault()
      //    - 浏览器可以优化滚动性能，不需要等待事件处理完成就能滚动
      //    - 对于 scroll 事件特别重要，可以提升滚动流畅度
      //    - 如果设置为 passive: true，就不能在事件处理函数中调用 preventDefault()
      //
      // 3. once: true 的含义：
      //    - 事件监听器只会执行一次，执行后自动移除
      //    - 适合只需要触发一次的场景（如用户首次交互）
      //    - 不需要手动调用 removeEventListener
      //
      // ============================================

      // 滚动事件：使用 window（窗口级别），passive: true（优化滚动性能）
      window.addEventListener('scroll', handleInteraction, { passive: true });
      
      // 点击事件：使用 window（窗口级别），once: true（只需要检测一次用户交互）
      window.addEventListener('click', handleInteraction, { once: true });
      
      // 键盘事件：使用 window（窗口级别），once: true（只需要检测一次用户交互）
      window.addEventListener('keydown', handleInteraction, { once: true });
      
      // 页面卸载事件：使用 window（窗口级别），无选项（标准事件）
      window.addEventListener('beforeunload', handleUnload);
      
      // 页面可见性变化：使用 document（文档级别），无选项（标准事件）
      // 注意：visibilitychange 事件只在 document 上可用，不在 window 上
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        observer.disconnect();
        // 移除事件监听器
        // 注意：once: true 的事件已经自动移除，但为了代码健壮性，这里仍然尝试移除
        // removeEventListener 对已移除的监听器不会报错
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
        window.removeEventListener('beforeunload', handleUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        clearInterval(checkBackgroundTime);
      };
    } catch (error) {
      console.error('LCP 监控初始化失败:', error);
    }
  }, [isStopped]);

  // 获取最终的 LCP 值（所有候选中 renderTime 最大的）
  const finalLCP = lcpEntries.length > 0
    ? lcpEntries.reduce((max, entry) => 
        entry.renderTime > max.renderTime ? entry : max
      )
    : null;

  return (
    <div className="space-y-4">
      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">LCP 实时监控</h2>
        
        {/* 当前 LCP 显示 */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">当前 LCP 候选：</span>
            {isStopped && (
              <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded text-sm">
                已停止更新
              </span>
            )}
          </div>
          {currentLCP ? (
            <div className="bg-white dark:bg-gray-800 p-4 rounded space-y-2 text-sm">
              <div>
                <strong>元素：</strong>
                <code className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  {currentLCP.element}
                </code>
              </div>
              <div>
                <strong>渲染时间：</strong>
                <span className="ml-2 font-mono">
                  {currentLCP.renderTime.toFixed(2)} ms
                </span>
              </div>
              <div>
                <strong>元素大小：</strong>
                <span className="ml-2 font-mono">
                  {currentLCP.size.toLocaleString()} px²
                </span>
              </div>
              {currentLCP.url && (
                <div>
                  <strong>URL：</strong>
                  <span className="ml-2 text-xs break-all">{currentLCP.url}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              等待 LCP 候选元素...
            </div>
          )}
        </div>

        {/* 最终 LCP 值 */}
        {finalLCP && (
          <div className="mb-4">
            <div className="font-medium mb-2">最终 LCP 值：</div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {finalLCP.renderTime.toFixed(2)} ms
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                元素：{finalLCP.element} | 大小：{finalLCP.size.toLocaleString()} px²
              </div>
            </div>
          </div>
        )}

        {/* 停止原因 */}
        {isStopped && stopReasonRef.current && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>停止原因：</strong>{stopReasonRef.current}
          </div>
        )}

        {/* LCP 候选历史 */}
        {lcpEntries.length > 0 && (
          <div className="mt-4">
            <div className="font-medium mb-2">LCP 候选历史（共 {lcpEntries.length} 个）：</div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {lcpEntries.map((entry, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 p-3 rounded text-xs ${
                    entry === finalLCP ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium">{entry.element}</div>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        时间: {entry.renderTime.toFixed(2)} ms | 大小: {entry.size.toLocaleString()} px²
                      </div>
                    </div>
                    {entry === finalLCP && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-xs ml-2">
                        最终值
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 性能提示 */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm">
        <strong>💡 提示：</strong>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li>打开浏览器开发者工具的 Performance 面板，可以看到更详细的 LCP 信息</li>
          <li>LCP 值应该在 2.5 秒以内（良好），超过 4 秒需要优化</li>
          <li>尝试滚动页面或点击，观察 LCP 是否停止更新</li>
          <li>刷新页面可以看到不同的加载顺序，LCP 候选可能会不同</li>
        </ul>
      </div>
    </div>
  );
}

