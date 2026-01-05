import { Metadata } from "next";
import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";
import React from "react";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  
  // Fetch tenant data to create dynamic metadata
  try {
    const caller = await import("@/trpc/server").then(m => m.caller);
    const tenant = await caller.tenants.getOne({ slug });
    
    return {
      title: `${tenant.name} | funroad Tenant Store`,
      description: tenant.description || `Shop at ${tenant.name} on funroad's multitenant e-commerce platform.`,
      keywords: [tenant.name, "e-commerce", "tenant", "storefront", "marketplace", "funroad"],
      openGraph: {
        type: "website",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/tenants/${slug}`,
        title: `${tenant.name} | funroad Tenant Store`,
        description: tenant.description || `Shop at ${tenant.name} on funroad's multitenant e-commerce platform.`,
        siteName: "funroad",
        images: tenant.image ? [
          {
            url: typeof tenant.image === 'object' && 'url' in tenant.image && tenant.image.url ? tenant.image.url : "/og-image-tenant.jpg",
            width: 1200,
            height: 630,
            alt: tenant.name || "funroad Tenant Store",
          },
        ] : [
          {
            url: "/og-image-tenant.jpg",
            width: 1200,
            height: 630,
            alt: tenant.name || "funroad Tenant Store",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${tenant.name} | funroad Tenant Store`,
        description: tenant.description || `Shop at ${tenant.name} on funroad's multitenant e-commerce platform.`,
        images: [tenant.image ? (typeof tenant.image === 'object' && 'url' in tenant.image && tenant.image.url ? tenant.image.url : "/og-image-tenant.jpg") : "/og-image-tenant.jpg"],
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/tenants/${slug}`,
      },
    };
  } catch (error) {
      console.error("Failed to generate product metadata:", error);
    // Fallback metadata if tenant data cannot be fetched
    return {
      title: `Tenant Store | funroad`,
      description: `Shop at this tenant store on funroad's multitenant e-commerce platform.`,
      keywords: ["e-commerce", "tenant", "storefront", "marketplace", "funroad"],
      openGraph: {
        type: "website",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/tenants/${slug}`,
        title: "Tenant Store | funroad",
        description: "Shop at this tenant store on funroad's multitenant e-commerce platform.",
        siteName: "funroad",
        images: [
          {
            url: "/og-image-tenant.jpg",
            width: 1200,
            height: 630,
            alt: "funroad Tenant Store",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Tenant Store | funroad",
        description: "Shop at this tenant store on funroad's multitenant e-commerce platform.",
        images: ["/og-image-tenant.jpg"],
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/tenants/${slug}`,
      },
    };
  }
};

const Page = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );
};

export default Page;
