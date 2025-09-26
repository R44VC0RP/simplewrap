export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://simplewrap.dev/#organization",
        "name": "SimpleWrap",
        "url": "https://simplewrap.dev",
        "logo": {
          "@type": "ImageObject",
          "url": "https://simplewrap.dev/simplewrap.png",
          "width": 512,
          "height": 512
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support@simplewrap.dev",
          "contactType": "customer support"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://simplewrap.dev/#website",
        "url": "https://simplewrap.dev",
        "name": "SimpleWrap",
        "description": "Easy Twitter API & SDK for developers",
        "publisher": {
          "@id": "https://simplewrap.dev/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": "https://simplewrap.dev/#webpage",
        "url": "https://simplewrap.dev",
        "name": "SimpleWrap - Easy Twitter API & SDK",
        "description": "Get an easy-to-use API + SDK for posting and reading from X (Twitter). Build powerful social media integrations with simple, developer-friendly tools.",
        "isPartOf": {
          "@id": "https://simplewrap.dev/#website"
        },
        "about": {
          "@id": "https://simplewrap.dev/#organization"
        },
        "datePublished": "2025-01-27",
        "dateModified": "2025-01-27",
        "breadcrumb": {
          "@id": "https://simplewrap.dev/#breadcrumb"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://simplewrap.dev/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://simplewrap.dev"
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "SimpleWrap API",
        "description": "Easy-to-use Twitter API wrapper for developers to build social media integrations",
        "url": "https://simplewrap.dev",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "provider": {
          "@id": "https://simplewrap.dev/#organization"
        },
        "featureList": [
          "Post tweets with media attachments",
          "Validate Twitter tokens",
          "Base64 and URL media support",
          "Automatic token refresh",
          "Developer-friendly API"
        ]
      },
      {
        "@type": "APIReference",
        "name": "SimpleWrap Twitter API",
        "description": "RESTful API for Twitter integration with media support",
        "url": "https://simplewrap.dev/api/v1/x/post",
        "provider": {
          "@id": "https://simplewrap.dev/#organization"
        },
        "programmingModel": "REST",
        "targetPlatform": "Web"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
