import React from "react";
import Head from "next/head";

/**
 * Props for the Layout component
 *
 * @interface LayoutProps
 * @property {React.ReactNode} children - The content to render inside the layout
 * @property {string} [title] - The page title
 * @property {string} [description] - The page meta description
 */
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

/**
 * Layout component that wraps all pages
 *
 * Provides consistent page structure with head metadata
 *
 * @param {LayoutProps} props - Component props
 * @returns {JSX.Element} The layout component
 */
export function Layout({
  children,
  title = "Next.js Example",
  description = "A minimal Next.js example with pages router",
}: LayoutProps): JSX.Element {
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
