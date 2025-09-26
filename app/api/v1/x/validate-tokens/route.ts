import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { validateTwitterTokens } from "@/lib/user-tokens";

export async function GET(request: NextRequest) {
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
          profile: ["read"],
        },
      },
    });

    if (!verification.valid) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }

    const userId = verification.key?.userId;
    if (!userId) {
      return NextResponse.json(
        { error: "Unable to identify user" },
        { status: 500 }
      );
    }

    // Validate Twitter tokens
    const validation = await validateTwitterTokens(userId);

    return NextResponse.json({
      success: true,
      data: {
        valid: validation.valid,
        error: validation.error,
        user: validation.user ? {
          id: validation.user.id,
          username: validation.user.username,
          name: validation.user.name,
        } : null,
      },
    });

  } catch (error: any) {
    console.error("Error validating tokens:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        message: error.message 
      },
      { status: 500 }
    );
  }
}