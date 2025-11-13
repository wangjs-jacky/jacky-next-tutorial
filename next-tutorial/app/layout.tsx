import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js App Router Demo",
  description: "A comprehensive demo covering all App Router features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex items-center px-2 py-4 text-lg font-semibold">
                  Next.js Demo
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-gray-300">
                    首页
                  </Link>
                  <Link href="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-gray-300">
                    关于
                  </Link>
                  <Link href="/products" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-gray-300">
                    产品
                  </Link>
                  <Link href="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-gray-300">
                    仪表盘
                  </Link>
                  <Link href="/blog" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-gray-300">
                    博客
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
            Next.js App Router Demo - 覆盖所有场景
          </div>
        </footer>
      </body>
    </html>
  );
}
