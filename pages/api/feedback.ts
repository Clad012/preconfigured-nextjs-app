import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { name, email, message } = req.body;

    // Validate the data
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // In a real app, you would save this data to a database
    console.log("Feedback received:", { name, email, message });

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Feedback submitted successfully!",
    });
  } catch (error) {
    console.error("Error processing feedback:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your feedback",
    });
  }
}
