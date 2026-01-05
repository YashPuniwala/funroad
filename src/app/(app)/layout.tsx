import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "funroad - Multitenant E-commerce Platform",
    template: "%s | funroad",
  },
  description: "funroad is a revolutionary multitenant e-commerce platform designed for the next generation of global creators. Build, scale, and manage multiple storefronts with advanced features.",
  keywords: ["e-commerce", "multitenant", "marketplace", "online store", "digital commerce", "global creators", "funroad"],
  authors: [{ name: "funroad Team" }],
  creator: "funroad",
  publisher: "funroad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com",
    title: "funroad - Multitenant E-commerce Platform",
    description: "Build and scale your e-commerce business with our revolutionary multitenant platform.",
    siteName: "funroad",
    images: [
      {
        url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg` : "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "funroad - Multitenant E-commerce Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "funroad - Multitenant E-commerce Platform",
    description: "Build and scale your e-commerce business with our revolutionary multitenant platform.",
    images: [process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg` : "/og-image.jpg"],
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
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
