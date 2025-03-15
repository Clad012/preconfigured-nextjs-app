import type { NextApiRequest, NextApiResponse } from "next";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | { error: string }>
) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
