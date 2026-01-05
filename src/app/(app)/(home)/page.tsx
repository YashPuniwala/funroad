import { Metadata } from "next";
import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

interface Props {
  params: Promise<{
    category: string
  }>,
  searchParams: Promise<SearchParams>
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home | funroad - Multitenant E-commerce Platform",
    description: "Discover the future of e-commerce with funroad's revolutionary multitenant platform. Build, scale, and manage multiple storefronts with advanced features for global creators.",
    keywords: ["e-commerce", "multitenant", "marketplace", "online store", "digital commerce", "global creators", "funroad", "home"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/`,
      title: "Home | funroad - Multitenant E-commerce Platform",
      description: "Discover the future of e-commerce with funroad's revolutionary multitenant platform.",
      siteName: "funroad",
      images: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-home.jpg` : "/og-image-home.jpg",
          width: 1200,
          height: 630,
          alt: "funroad - Home Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Home | funroad - Multitenant E-commerce Platform",
      description: "Discover the future of e-commerce with funroad's revolutionary multitenant platform.",
      images: [process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-home.jpg` : "/og-image-home.jpg"],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/`,
    },
  };
};

export default async function Home({searchParams}: Props) {
  const filters = await loadProductFilters(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    limit: DEFAULT_LIMIT
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
}
