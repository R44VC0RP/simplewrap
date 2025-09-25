import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIKeysManager } from "@/components/APIKeysManager";
import { APIKey } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ClickToCopy } from "@/components/ClickToCopy";

export default async function Home() {
  // Get session data on the server
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // Preload API keys data if user is authenticated
  let initialApiKeys: APIKey[] = [];
  if (session) {
    try {
      const apiKeysResponse = await auth.api.listApiKeys({
        headers: await headers()
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
          <code className="text-3xl md:text-4xl font-heading font-semibold p-2 bg-accent w-fit">
            bun i simplewrap
          </code>
          <p className="text-lg md:text-xl text-muted-foreground mb-2 max-w-2xl leading-relaxed font-medium tracking-tight-4">
            Get an easy to use API + SDK for posting and reading from X.
            Build powerful social media integrations with simple, developer-friendly tools.
          </p>

          {!session && (
            <Link href="/login" className="text-lg text-muted-foreground font-medium tracking-tight-4 my-4 mb-2">
              <Button variant="default">
                Login with
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </Button>
            </Link>
          )}
        </div>

        {/* API Management Section - Only show when logged in */}
        {session && (
          <div className="space-y-8">
            <div className="flex flex-row justify-between">

              <Link href={`https://x.com/${session.user.email}`} className="text-lg text-foreground/90 font-medium tracking-tight-4 my-4 mb-2 inline-flex items-center gap-1">
                <Image src={session.user.image || ""} alt={session.user.name} width={20} height={20} className="rounded-full" />
                @{session.user.email}
              </Link>

              <Link href="/logout" className="text-lg text-muted-foreground font-medium tracking-tight-4 my-4 mb-2">
                <Button variant="outline">
                  Logout
                </Button>
              </Link>
            </div>

            {/* API Documentation */}
            <div className="space-y-4 border-b-2 border-dotted border-muted-foreground/30 pb-4">
              <h2 className="text-2xl font-heading font-semibold text-foreground">API & SDK Documentation</h2>
              <div className="flex flex-row justify-between">
                Base URL:
                <ClickToCopy text="https://simplewrap.dev" />
              </div>
              <div className="space-y-3">
                <h3 className="font-heading font-semibold text-foreground mb-2">Posting a Tweet</h3>
                <h4 className="font-heading font-semibold text-foreground mb-2">SDK</h4>
                <div className="bg-muted rounded p-3 text-sm font-mono">
                  
                  <pre className="text-muted-foreground mb-2">
                    <ClickToCopy text="/api/v1/post" variant="minimal" />
                  </pre>
                  <div className="text-muted-foreground mb-2">Headers:</div>
                  <div>Authorization: Bearer YOUR_API_KEY</div>
                  <div>Content-Type: application/json</div>
                  <div className="text-muted-foreground mb-2 mt-3">Body:</div>
                  <div>{`{ "text": "Hello from the API!" }`}</div>
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-2">API</h4>
                <div className="bg-muted rounded p-3 text-sm font-mono">
                  <pre className="text-muted-foreground mb-2">
                    <ClickToCopy text="/api/v1/post" variant="minimal" />
                  </pre>
                  <div className="text-muted-foreground mb-2">Headers:</div>
                  <div>Authorization: Bearer YOUR_API_KEY</div>
                  <div>Content-Type: application/json</div>
                  <div className="text-muted-foreground mb-2 mt-3">Body:</div>
                  <div>{`{ "text": "Hello from the API!" }`}</div>
                </div>

              </div>
            </div>

            {/* API Key Management */}
            <APIKeysManager initialApiKeys={initialApiKeys} />
          </div>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-foreground/10 rounded-lg flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground">Fast & Simple</h3>
            <p className="text-muted-foreground font-medium tracking-tight-4">
              Get started in minutes with our intuitive API. No complex setup required.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-foreground/10 rounded-lg flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground">Reliable</h3>
            <p className="text-muted-foreground font-medium tracking-tight-4">
              Built on robust infrastructure with 99.9% uptime and comprehensive error handling.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-foreground/10 rounded-lg flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground">Developer First</h3>
            <p className="text-muted-foreground font-medium tracking-tight-4">
              Comprehensive SDKs, detailed docs, and excellent developer experience.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-8 mt-16">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground font-medium tracking-tight-4">
              © {new Date().getFullYear()} EXON ENTERPRISE LLC. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium tracking-tight-4">
                Privacy Policy
              </a>
              <a href="/tos" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium tracking-tight-4">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}