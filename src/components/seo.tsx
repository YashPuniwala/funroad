// src/components/seo.ts
import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export const generateSEOMetadata = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: SEOProps): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com";

  const fullUrl = url
    ? url.startsWith("http")
      ? url
      : `${baseUrl}${url}`
    : baseUrl;

  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image}`
    : `${baseUrl}/og-image.jpg`;

  return {
    title: title ? `${title} | funroad` : "funroad - Multitenant E-commerce Platform",
    description:
      description ??
      "funroad is a revolutionary multitenant e-commerce platform designed for the next generation of global creators.",
    keywords:
      keywords ?? [
        "e-commerce",
        "multitenant",
        "marketplace",
        "online store",
        "digital commerce",
        "global creators",
        "funroad",
      ],
    openGraph: {
      type,
      locale: "en_US",
      url: fullUrl,
      title: title ?? "funroad - Multitenant E-commerce Platform",
      description:
        description ??
        "Build and scale your e-commerce business with our revolutionary multitenant platform.",
      siteName: "funroad",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title ?? "funroad - Multitenant E-commerce Platform",
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        tags: keywords,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? "funroad - Multitenant E-commerce Platform",
      description:
        description ??
        "Build and scale your e-commerce business with our revolutionary multitenant platform.",
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
};
