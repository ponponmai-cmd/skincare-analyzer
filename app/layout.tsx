import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC, IBM_Plex_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CompareTray } from "@/components/compare-store";
import { TooltipProvider } from "@/components/ui/tooltip";

const sans = Noto_Sans_TC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const serif = Noto_Serif_TC({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "膚鑑",
    template: "%s · 膚鑑",
  },
  description:
    "把保養品拆成中英成分、功效證據與每毫升價格，找出說得清差距的平價替代。含防曬比較與年紀建議。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <TooltipProvider>
          <div className="flex min-h-full flex-col">
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-card focus:px-3 focus:py-2"
            >
              跳到內容
            </a>
            <Suspense fallback={<div className="h-16 border-b border-border" />}>
              <SiteHeader />
            </Suspense>
            <main id="content" className="flex-1 pb-24">
              {children}
            </main>
            <SiteFooter />
            <CompareTray />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
