"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

// 模拟照片数据
const photos = [
  {
    id: "1",
    title: "山景",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "壮丽的山脉景色",
  },
  {
    id: "2",
    title: "海滩",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    description: "美丽的海滩风光",
  },
  {
    id: "3",
    title: "森林",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    description: "宁静的森林小径",
  },
];

export default function PhotosPageAlternative() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const photoId = searchParams.get("photo");
  const selectedPhoto = photos.find((p) => p.id === photoId);

  const openModal = (id: string) => {
    router.push(`/photos-alternative?photo=${id}`, { scroll: false });
  };

  const closeModal = () => {
    router.push("/photos-alternative", { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">照片库（不使用并行路由）</h1>
        <p className="text-gray-600 dark:text-gray-400">
          使用客户端状态管理实现模态框效果
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => openModal(photo.id)}
            className="group relative block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
          >
            <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {photo.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* 模态框 */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-4 p-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{selectedPhoto.description}</p>
              </div>

              <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

