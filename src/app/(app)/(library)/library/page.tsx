import { Metadata } from "next";
import { DEFAULT_LIMIT } from "@/constants";
import LibraryView from "@/modules/library/ui/views/library-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic"

interface Props {
  params: { productId?: string }; // ✅ make optional
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Library | funroad - Explore Products",
    description: "Explore our extensive library of products on funroad's multitenant e-commerce platform. Find the perfect items for your needs.",
    keywords: ["library", "products", "e-commerce", "multitenant", "marketplace", "funroad", "product catalog", "browse products"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/library`,
      title: "Library | funroad - Explore Products",
      description: "Explore our extensive library of products on funroad's multitenant e-commerce platform.",
      siteName: "funroad",
      images: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-library.jpg` : "/og-image-library.jpg",
          width: 1200,
          height: 630,
          alt: "funroad - Product Library",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Library | funroad - Explore Products",
      description: "Explore our extensive library of products on funroad's multitenant e-commerce platform.",
      images: [process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-library.jpg` : "/og-image-library.jpg"],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/library`,
    },
  };
};

const LibraryPage = async ({ params }: Props) => {
  const { productId } = params;
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
    })
  );

  if (productId) {
    void queryClient.prefetchQuery(
      trpc.reviews.getOne.queryOptions({ productId })
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView productId={productId} />
    </HydrationBoundary>
  );
};

export default LibraryPage;
