import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/pages/api/posts";

interface ServerPostsProps {
  posts: Post[];
}

export async function ServerPosts() {
  // During rendering, fetch directly from the external API
  // This ensures it works during both build time and runtime
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts: Post[] = await response.json();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Server-Side Posts</CardTitle>
        <CardDescription>
          This data is fetched on the server during SSR
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
  );
}
