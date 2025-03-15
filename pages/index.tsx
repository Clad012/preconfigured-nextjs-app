import { GetStaticProps } from "next";
import { ClientTodoList } from "@/components/ClientTodoList";
import { FeedbackForm } from "@/components/FeedbackForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Layout } from "@/components/Layout";
import type { Post } from "@/pages/api/posts";

// This is for Server-Side Rendering (SSR)
export const getStaticProps: GetStaticProps = async () => {
  try {
    // During static build, we need to fetch directly from the external API
    // since our own API routes aren't accessible during build time
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();

    return {
      props: {
        posts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    };
  }
};

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout
      title="Next.js 14 Examples"
      description="Examples of Next.js 14 features with pages router"
    >
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/next.svg"
                alt="Next.js Logo"
                width={120}
                height={20}
                priority
              />
              <span className="font-bold text-xl">+</span>
              <span className="font-bold text-xl">shadcn/ui</span>
            </div>
            <nav>
              <ul className="flex gap-4">
                <li>
                  <a
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    UI Components
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="container mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Next.js 14 with Pages Router + shadcn/ui
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Examples of client-side rendering, server-side rendering, server
              actions, and backend logic
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* Client-side Rendering Example */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Client-Side Rendering
              </h2>
              <ClientTodoList />
            </div>

            {/* Server-side Rendering Example */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Server-Side Rendering
              </h2>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Server-Side Posts</CardTitle>
                  <CardDescription>
                    This data is fetched at build time and can be revalidated
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {posts.map((post) => (
                      <li key={post.id} className="border-b pb-3">
                        <h3 className="text-lg font-medium">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {post.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Server Action Example */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Server Actions</h2>
              <FeedbackForm />
            </div>

            {/* API Routes Example */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Backend Logic</h2>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>API Example</CardTitle>
                  <CardDescription>
                    Create and access API routes in Next.js
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Next.js provides API routes that live in the{" "}
                    <code>pages/api</code> directory. Each file becomes an API
                    endpoint that can be called from your frontend code.
                  </p>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}`}</code>
                    </pre>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={async () => {
                        try {
                          const response = await fetch("/api/hello");
                          const data = await response.json();
                          alert(
                            `API Response: ${JSON.stringify(data, null, 2)}`
                          );
                        } catch (error) {
                          alert("Error calling API");
                          console.error(error);
                        }
                      }}
                    >
                      Test API
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <footer className="border-t py-8 mt-12">
          <div className="container mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Built with Next.js 14 and shadcn/ui components
            </p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
