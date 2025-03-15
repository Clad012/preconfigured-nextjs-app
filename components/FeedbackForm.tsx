"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData(e.currentTarget);
      const formValues = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      };

      // Call the API endpoint
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      setResult(data);

      // Reset form if successful
      if (data.success) {
        const form = document.getElementById(
          "feedback-form"
        ) as HTMLFormElement;
        form.reset();
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Feedback Form</CardTitle>
        <CardDescription>Submit feedback to our API endpoint</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="feedback-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            ></textarea>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>

          {result && (
            <div
              className={`p-3 rounded-md ${
                result.success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {result.message}
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          This form uses Next.js API routes to process submissions on the
          server.
        </p>
      </CardFooter>
    </Card>
  );
}
