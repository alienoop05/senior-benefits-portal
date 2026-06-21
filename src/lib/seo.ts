export const siteConfig = {
  name: "Senior Benefits & Retirement Portal",
  description: "Your trusted resource for Social Security, Medicare, retirement planning, and senior benefits in the USA.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://www.auro.boats",
  ogImage: "https://www.auro.boats/og.jpg",
  links: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example",
  },
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  url,
  type = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  url?: string;
  type?: "website" | "article";
} = {}) {
  return {
    title,
    description,
    alternates: {
      canonical: url ? `${siteConfig.url}${url}` : siteConfig.url,
    },
    openGraph: {
      title,
      description,
      type,
      ...(url && { url: `${siteConfig.url}${url}` }),
      siteName: siteConfig.name,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@example",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

// Helper to generate Article Schema
export function generateArticleSchema(post: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  authorName: string;
  images: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.images,
    author: [
      {
        "@type": "Person",
        name: post.authorName,
        url: `${siteConfig.url}/about`,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}

// Helper to generate Breadcrumb Schema
export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

// Helper to generate FAQ Schema
export function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

// Helper to generate WebSite Schema
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// Helper to generate Organization Schema
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github
    ]
  };
}
