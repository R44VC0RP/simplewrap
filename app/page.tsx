import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIKeysManager } from "@/components/APIKeysManager";
import { APIKey } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ClickToCopy } from "@/components/ClickToCopy";
import { APISDKTabs } from "@/components/APISDKTabs";

export default async function Home() {
  // Get session data on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Preload API keys data if user is authenticated
  let initialApiKeys: APIKey[] = [];
  if (session) {
    try {
      const apiKeysResponse = await auth.api.listApiKeys({
        headers: await headers(),
      });
      initialApiKeys = apiKeysResponse || [];
    } catch (error) {
      console.error("Failed to fetch API keys:", error);
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col items-left justify-left gap-2 border-b-2 border-dotted border-muted-foreground/30 py-4">
          <code className="text-3xl md:text-4xl font-heading font-semibold p-2 bg-accent w-fit flex items-center gap-2">
            bun i simplewrap
          </code>
          <p className="text-lg md:text-xl text-muted-foreground mb-2 max-w-2xl leading-relaxed font-medium tracking-tight-4">
            Get an easy to use API + SDK for posting and reading from X. Build
            powerful social media integrations with simple, developer-friendly
            tools.
          </p>

          {!session && (
            <Link
              href="/login"
              className="text-lg text-muted-foreground font-medium tracking-tight-4 my-4 mb-2"
            >
              <Button variant="default">
                Login with
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-twitter-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </Button>
            </Link>
          )}
        </div>

        {/* API Management Section - Only show when logged in */}
        {session && (
          <div className="space-y-8 mb-6">
            <div className="flex flex-row justify-between">
              <Link
                href={`https://x.com/${session.user.email}`}
                className="text-lg text-[#466F80] font-medium tracking-tight-4 my-4 mb-2 inline-flex items-center gap-1"
                target="_blank"
              >
                <Image
                  src={session.user.image || ""}
                  alt={session.user.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                @{session.user.email}
              </Link>

              <Link
                href="/logout"
                className="text-lg text-muted-foreground font-medium tracking-tight-4 my-4 mb-2"
              >
                <Button variant="outline">Logout</Button>
              </Link>
            </div>
            <APIKeysManager initialApiKeys={initialApiKeys} />
          </div>
        )}
        <div className="space-y-8 border-t-2 border-dotted border-muted-foreground/30 pt-4">
          {/* API Documentation */}
          <div className="space-y-4 border-b-2 border-dotted border-muted-foreground/30 pb-4">
            <h2 className="text-2xl font-heading font-semibold text-foreground">
              API & SDK Documentation
            </h2>
            <div className="flex flex-row justify-between">
              Base URL:
              <ClickToCopy text="https://simplewrap.dev" />
            </div>
            <div className="space-y-8">
              {/* POST /api/v1/x/post */}
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  Posting a Tweet
                </h3>
                <p className="text-muted-foreground">Post a tweet to Twitter with optional media attachments</p>
                
                {/* Media Requirements */}
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 text-sm">
                  <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Media Requirements</h5>
                  <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                    <li>• <strong>Images:</strong> JPEG, PNG, GIF, WEBP (max 5MB each)</li>
                    <li>• <strong>Videos:</strong> MP4 (max 512MB, up to 2min 20sec)</li>
                    <li>• <strong>Limits:</strong> Max 4 images OR 1 video per tweet (Cannot mix images and videos in same tweet)</li>
                    <li>• <strong>Types:</strong> Base64 encoded data or public URLs</li>
                  </ul>
                </div>
                
                {/* Endpoint */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Endpoint</h4>
                  <div className="bg-muted rounded p-3 text-sm font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-semibold">POST</span>
                      <ClickToCopy text="/api/v1/x/post" variant="minimal" />
                    </div>
                  </div>
                </div>

                {/* Request & Response Layout */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Left Column - Headers & Payload */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Headers</h4>
                      <div className="bg-muted rounded p-3 text-sm font-mono">
                        <div>Authorization: Bearer YOUR_API_KEY</div>
                        <div>Content-Type: application/json</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Payload Examples</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Text only:</div>
                          <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                            <code className="language-json">{`{
  "text": "Hello from SimpleWrap API! 🚀"
}`}</code>
                          </pre>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">With base64 image:</div>
                          <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                            <code className="language-json">{`{
  "text": "Check out this image! 📸",
  "media": [
    {
      "type": "base64",
      "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
      "mediaType": "image/jpeg"
    }
  ]
}`}</code>
                          </pre>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">With image URL:</div>
                          <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                            <code className="language-json">{`{
  "text": "Amazing photo! 🌟",
  "media": [
    {
      "type": "url",
      "data": "https://example.com/image.jpg",
      "mediaType": "image/jpeg"
    }
  ]
}`}</code>
                          </pre>
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Multiple images (max 4):</div>
                          <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                            <code className="language-json">{`{
  "text": "Photo gallery! 📷",
  "media": [
    {
      "type": "url",
      "data": "https://example.com/photo1.jpg"
    },
    {
      "type": "base64",
      "data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}`}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Responses */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Responses</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-green-600 font-medium mb-2">200 - Success</div>
                        <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                          <code className="language-json">{`{
  "success": true,
  "data": {
    "id": "1234567890123456789",
    "text": "Hello from SimpleWrap API! 🚀",
    "created_at": "2025-01-27T10:30:00.000Z",
    "status": "posted",
    "user_id": "user_123",
    "media_count": 0
  },
  "message": "Tweet posted successfully"
}`}</code>
                        </pre>
                      </div>

                      <div>
                        <div className="text-red-600 font-medium mb-2">401 - Twitter Auth Expired</div>
                        <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                          <code className="language-json">{`{
  "error": "Twitter authentication failed",
  "message": "Your Twitter access token has expired. Please reconnect your Twitter account.",
  "code": "TWITTER_AUTH_EXPIRED"
}`}</code>
                        </pre>
                      </div>

                      <div>
                        <div className="text-yellow-600 font-medium mb-2">400 - Validation Error</div>
                        <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                          <code className="language-json">{`{
  "error": "Maximum 4 media items allowed per tweet"
}`}</code>
                        </pre>
                      </div>

                      <div>
                        <div className="text-orange-600 font-medium mb-2">400 - Media Error</div>
                        <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                          <code className="language-json">{`{
  "error": "Cannot mix images and videos in the same tweet"
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GET /api/v1/x/validate-tokens */}
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  Validating Tokens (X)
                </h3>
                <p className="text-muted-foreground">Check if your Twitter tokens are still valid</p>
                
                {/* Endpoint */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Endpoint</h4>
                  <div className="bg-muted rounded p-3 text-sm font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 font-semibold">GET</span>
                      <ClickToCopy text="/api/v1/x/validate-tokens" variant="minimal" />
                    </div>
                  </div>
                </div>

                {/* Request & Response Layout */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Left Column - Headers */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Headers</h4>
                      <div className="bg-muted rounded p-3 text-sm font-mono">
                        <div>Authorization: Bearer YOUR_API_KEY</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium mb-2">Use this endpoint to:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Check if Twitter tokens are still valid</li>
                        <li>• Get current Twitter user info</li>
                        <li>• Debug authentication issues</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Response */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Response</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-green-600 font-medium mb-2">200 - Success</div>
                        <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                          <code className="language-json">{`{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": "1234567890",
      "username": "your_username",
      "name": "Your Display Name"
    }
  }
}`}</code>
                        </pre>
                      </div>

                      <div>
                        <div className="text-red-600 font-medium mb-2">200 - Invalid Tokens</div>
                        <pre className="bg-muted rounded p-3 text-xs font-mono overflow-x-auto">
                          <code className="language-json">{`{
  "success": true,
  "data": {
    "valid": false,
    "error": "Token validation failed",
    "user": null
  }
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-8 mt-16">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground font-medium tracking-tight-4">
              © {new Date().getFullYear()} SimpleWrap. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium tracking-tight-4"
              >
                Privacy Policy
              </Link>
              <Link
                href="/tos"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium tracking-tight-4"
              >
                Terms of Service
              </Link>
              <Link
                href="mailto:support@simplewrap.dev"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium tracking-tight-4"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
