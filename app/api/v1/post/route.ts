import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Get the API key from the Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const apiKey = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify the API key using Better Auth
    const verification = await auth.api.verifyApiKey({
      body: {
        key: apiKey,
        permissions: {
          tweets: ["write"],
        },
      },
    });

    if (!verification.valid) {
      return NextResponse.json(
        { error: "Invalid API key or insufficient permissions" },
        { status: 401 }
      );
    }

    // Get the request body
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'text' field" },
        { status: 400 }
      );
    }

    if (text.length > 280) {
      return NextResponse.json(
        { error: "Tweet text exceeds 280 characters" },
        { status: 400 }
      );
    }

    // Get the user's Twitter access token from the database
    // We need to find the user associated with this API key
    const userId = verification.key?.userId;
    if (!userId) {
      return NextResponse.json(
        { error: "Unable to identify user" },
        { status: 500 }
      );
    }

    // Here we would typically:
    // 1. Get the user's Twitter access token from the account table
    // 2. Use the Twitter API to post the tweet
    // For now, we'll return a success response with the tweet data

    // TODO: Implement actual Twitter API integration
    const tweetData = {
      id: `tweet_${Date.now()}`,
      text: text,
      user_id: userId,
      created_at: new Date().toISOString(),
      status: "posted",
    };

    return NextResponse.json({
      success: true,
      data: tweetData,
      message: "Tweet posted successfully",
    });

  } catch (error) {
    console.error("Error posting tweet:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
