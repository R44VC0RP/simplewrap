"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = useSession();

  const handleTwitterLogin = async () => {
    try {
      await signIn.social({ provider: "twitter" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-heading font-semibold mb-6">
            Easy X API + SDK
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-medium tracking-tight-4">
            Get an easy to use API + SDK for posting and reading from X. 
            Build powerful social media integrations with simple, developer-friendly tools.
          </p>
          
          {session ? (
            <div className="space-y-4">
              <p className="text-lg text-foreground font-medium tracking-tight-4">
                Welcome back, {session.user.name}! 👋
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-8 py-4 text-lg font-medium tracking-tight-4 hover:bg-foreground/90 transition-colors">
                  View API Docs
                </button>
                <button className="inline-flex items-center justify-center rounded-lg border border-border bg-background text-foreground px-8 py-4 text-lg font-medium tracking-tight-4 hover:bg-muted transition-colors">
                  Dashboard
                </button>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleTwitterLogin}
              className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-8 py-4 text-lg font-medium tracking-tight-4 hover:bg-foreground/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Login with X
            </Button>
          )}
        </div>

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