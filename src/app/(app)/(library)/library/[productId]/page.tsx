import { Metadata } from "next";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { dehydrate } from "@tanstack/react-query";
import ProductView, {
  ProductViewSkeleton,
} from "@/modules/library/ui/views/product-view";

interface Props {
  params: { productId: string }; // ✅ correct
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { productId } = await params;
  
  // Fetch product data to create dynamic metadata
  try {
    const caller = await import("@/trpc/server").then(m => m.caller);
    const product = await caller.library.getOne({ productId });
    
    return {
      title: `${product.name} | funroad Product`,
      description: typeof product.description === 'string' ? product.description : `Discover ${product.name} on funroad's multitenant e-commerce platform.`,
      keywords: [product.name, "e-commerce", "product", "multitenant", "marketplace", "funroad"],
      openGraph: {
        type: "website",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/library/${productId}`,
        title: `${product.name} | funroad Product`,
        description: typeof product.description === 'string' ? product.description : `Discover ${product.name} on funroad's multitenant e-commerce platform.`,
        siteName: "funroad",
        images: product.image ? [
          {
            url: (typeof product.image === 'object' && 'url' in product.image && product.image.url) ? product.image.url : "/og-image-product.jpg",
            width: 1200,
            height: 630,
            alt: product.name || "funroad Product",
          },
        ] : [
          {
            url: "/og-image-product.jpg",
            width: 1200,
            height: 630,
            alt: product.name || "funroad Product",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} | funroad Product`,
        description: typeof product.description === 'string' ? product.description : `Discover ${product.name} on funroad's multitenant e-commerce platform.`,
        images: [product.image ? ((typeof product.image === 'object' && 'url' in product.image && product.image.url) ? product.image.url : "/og-image-product.jpg") : "/og-image-product.jpg"],
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/library/${productId}`,
      },
    };
  } catch (error) {
      console.error("Failed to generate product metadata:", error);
    return {
      title: `Product Details | funroad`,
      description: "View product details on funroad's multitenant e-commerce platform.",
      keywords: ["product", "e-commerce", "multitenant", "marketplace", "funroad"],
      openGraph: {
        type: "website",
        locale: "en_US",
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/library/${productId}`,
        title: "Product Details | funroad",
        description: "View product details on funroad's multitenant e-commerce platform.",
        siteName: "funroad",
        images: [
          {
            url: "/og-image-product.jpg",
            width: 1200,
            height: 630,
            alt: "funroad Product",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Product Details | funroad",
        description: "View product details on funroad's multitenant e-commerce platform.",
        images: ["/og-image-product.jpg"],
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/library/${productId}`,
      },
    };
  }
};

const ProductIdPage = async ({ params }: Props) => {
  const { productId } = params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView productId={productId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default ProductIdPage;
