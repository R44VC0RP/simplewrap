import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserTwitterTokens, hasTwitterAccount, updateTwitterTokens } from "@/lib/user-tokens";
import { createTwitterClient } from "@/lib/twitter";

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
    const { text, media } = body;

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

    // Validate media if provided
    if (media) {
      if (!Array.isArray(media)) {
        return NextResponse.json(
          { error: "Media must be an array" },
          { status: 400 }
        );
      }

      if (media.length > 4) {
        return NextResponse.json(
          { error: "Maximum 4 media items allowed per tweet" },
          { status: 400 }
        );
      }

      // Validate each media item
      for (const [index, item] of media.entries()) {
        if (!item.type || !item.data) {
          return NextResponse.json(
            { error: `Media item ${index + 1}: 'type' and 'data' fields are required` },
            { status: 400 }
          );
        }

        if (!['base64', 'url'].includes(item.type)) {
          return NextResponse.json(
            { error: `Media item ${index + 1}: type must be 'base64' or 'url'` },
            { status: 400 }
          );
        }

        if (item.type === 'url') {
          try {
            new URL(item.data);
          } catch {
            return NextResponse.json(
              { error: `Media item ${index + 1}: invalid URL format` },
              { status: 400 }
            );
          }
        }
      }
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

    // Check if user has connected their Twitter account
    const hasTwitter = await hasTwitterAccount(userId);
    if (!hasTwitter) {
      return NextResponse.json(
        { 
          error: "Twitter account not connected", 
          message: "Please connect your Twitter account first" 
        },
        { status: 400 }
      );
    }

    // Get the user's Twitter access tokens
    const tokens = await getUserTwitterTokens(userId);
    if (!tokens) {
      return NextResponse.json(
        { 
          error: "Twitter tokens not found", 
          message: "Unable to retrieve Twitter authentication. Please reconnect your account." 
        },
        { status: 500 }
      );
    }

    // Create Twitter client with auto-refresh capability
    const twitterClient = createTwitterClient(
      tokens, 
      userId,
      async (userId, refreshedTokens) => {
        await updateTwitterTokens(userId, refreshedTokens);
      }
    );
    
    const tweetData = await twitterClient.postTweet(text, media);

    return NextResponse.json({
      success: true,
      data: {
        ...tweetData,
        user_id: userId,
      },
      message: "Tweet posted successfully",
    });

  } catch (error: any) {
    console.error("Error posting tweet:", error);
    
    // Handle specific Twitter API errors with user-friendly messages
    if (error.message?.includes('Twitter authentication failed')) {
      return NextResponse.json(
        { 
          error: "Twitter authentication failed", 
          message: "Your Twitter access token has expired. Please reconnect your Twitter account.",
          code: "TWITTER_AUTH_EXPIRED"
        },
        { status: 401 }
      );
    }
    
    if (error.message?.includes('Twitter API access forbidden')) {
      return NextResponse.json(
        { 
          error: "Twitter access forbidden", 
          message: "Your Twitter account doesn't have permission to post tweets. Please check your account settings.",
          code: "TWITTER_ACCESS_FORBIDDEN"
        },
        { status: 403 }
      );
    }
    
    if (error.message?.includes('rate limit exceeded')) {
      return NextResponse.json(
        { 
          error: "Rate limit exceeded", 
          message: "Twitter API rate limit reached. Please try again later.",
          code: "TWITTER_RATE_LIMIT"
        },
        { status: 429 }
      );
    }
    
    if (error.message?.includes('Duplicate tweet')) {
      return NextResponse.json(
        { 
          error: "Duplicate tweet", 
          message: "This tweet content has already been posted. Please try different content.",
          code: "TWITTER_DUPLICATE"
        },
        { status: 409 }
      );
    }
    
    // Generic Twitter API error
    if (error.message?.includes('Twitter API error')) {
      return NextResponse.json(
        { 
          error: "Twitter API error", 
          message: error.message,
          code: "TWITTER_API_ERROR"
        },
        { status: 502 }
      );
    }
    
    // Fallback for any other errors
    return NextResponse.json(
      { 
        error: "Internal server error", 
        message: "An unexpected error occurred while posting your tweet. Please try again.",
        code: "INTERNAL_ERROR"
      },
      { status: 500 }
    );
  }
}
