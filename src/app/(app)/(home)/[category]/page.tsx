import type { SearchParams } from "nuqs/server";
import { Metadata } from "next";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<SearchParams>;
}

export const dynamic = "force-dynamic"

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { category } = await params;
  
  // You could fetch category data here to get a proper name and description
  // For now, we'll use the category slug
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${categoryName} Products | funroad`,
    description: `Shop the latest ${categoryName} products on funroad's multitenant e-commerce platform. Find the perfect items in our extensive ${categoryName} collection.`,
    keywords: [categoryName, "products", "e-commerce", "multitenant", "marketplace", "funroad", `${categoryName} products`],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/${category}`,
      title: `${categoryName} Products | funroad`,
      description: `Shop the latest ${categoryName} products on funroad's multitenant e-commerce platform.`,
      siteName: "funroad",
      images: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-${category}.jpg` : `/og-image-${category}.jpg`,
          width: 1200,
          height: 630,
          alt: `${categoryName} Products on funroad`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Products | funroad`,
      description: `Shop the latest ${categoryName} products on funroad's multitenant e-commerce platform.`,
      images: [process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-${category}.jpg` : `/og-image-${category}.jpg`],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/${category}`,
    },
  };
};

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category,
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={category} />
    </HydrationBoundary>
  );
};

export default CategoryPage;
