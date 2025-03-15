import React from "react";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function Layout({
  children,
  title = "Next.js 14 Examples",
  description = "Examples of Next.js 14 features with pages router",
}: LayoutProps) {
  return (
    <div className="min-h-screen font-sans">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}
