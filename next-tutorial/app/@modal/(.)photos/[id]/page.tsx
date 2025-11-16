"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { use, useEffect, useRef } from "react";

// 模拟照片数据（实际应用中应该从 API 获取）
const photos: Record<string, { id: string; title: string; url: string; description: string }> = {
  "1": {
    id: "1",
    title: "山景",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "壮丽的山脉景色，展现了自然的力量和美丽。",
  },
  "2": {
    id: "2",
    title: "海滩",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
    description: "美丽的海滩风光，海浪轻抚着金色的沙滩。",
  },
  "3": {
    id: "3",
    title: "森林",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
    description: "宁静的森林小径，阳光透过树叶洒下斑驳的光影。",
  },
  "4": {
    id: "4",
    title: "城市",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop",
    description: "现代都市夜景，灯火通明的城市天际线。",
  },
  "5": {
    id: "5",
    title: "沙漠",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop",
    description: "广袤的沙漠景观，沙丘在风中不断变化形状。",
  },
  "6": {
    id: "6",
    title: "湖泊",
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=800&fit=crop",
    description: "清澈的湖泊倒影，如镜面般平静的水面。",
  },
};

export default function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  // 使用 React 19 的 use() hook 来处理 Promise
  const { id } = use(params);
  const photo = photos[id] || null;

  useEffect(() => {
    // 处理 ESC 键关闭模态框
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    // 处理点击背景关闭模态框
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        router.back();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // 防止背景滚动
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [router]);

  if (!photo) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400">照片未找到</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* 关闭按钮 */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          aria-label="关闭"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 照片内容 */}
        <div className="space-y-4 p-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {photo.description}
            </p>
          </div>

          <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
            按 ESC 或点击背景关闭
          </div>
        </div>
      </div>
    </div>
  );
}

