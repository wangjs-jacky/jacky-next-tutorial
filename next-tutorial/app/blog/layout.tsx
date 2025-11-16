"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // 只在非博客列表页面显示返回链接
  const showBackLink = pathname !== "/blog";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {showBackLink && (
        <Link
          href="/blog"
          className="inline-block text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← 返回博客列表
        </Link>
      )}
      {children}
    </div>
  );
}

