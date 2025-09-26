import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // All weights
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// We'll load Instrument Serif via Google Fonts link instead

export const metadata: Metadata = {
  title: {
    default: "SimpleWrap - Easy Twitter API & SDK",
    template: "%s | SimpleWrap"
  },
  description: "Get an easy-to-use API + SDK for posting and reading from X (Twitter). Build powerful social media integrations with simple, developer-friendly tools. Post tweets with media, validate tokens, and more.",
  keywords: [
    "Twitter API",
    "X API",
    "Twitter SDK",
    "Social Media API",
    "Tweet API",
    "Twitter Integration",
    "Developer Tools",
    "API Wrapper",
    "Twitter Bot",
    "Social Media Automation"
  ],
  authors: [{ name: "EXON ENTERPRISE LLC" }],
  creator: "EXON ENTERPRISE LLC",
  publisher: "EXON ENTERPRISE LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://simplewrap.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SimpleWrap - Easy Twitter API & SDK",
    description: "Get an easy-to-use API + SDK for posting and reading from X (Twitter). Build powerful social media integrations with simple, developer-friendly tools.",
    url: "https://simplewrap.dev",
    siteName: "SimpleWrap",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SimpleWrap - Easy Twitter API & SDK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SimpleWrap - Easy Twitter API & SDK",
    description: "Get an easy-to-use API + SDK for posting and reading from X (Twitter). Build powerful social media integrations with simple, developer-friendly tools.",
    images: ["/twitter-image.png"],
    creator: "@simplewrap",
    site: "@simplewrap",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100-900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        style={{ letterSpacing: '-0.04em' }}
      >
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
