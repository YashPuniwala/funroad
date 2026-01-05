import { Metadata } from "next";
import React from "react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { ShoppingBag, Zap, ShieldCheck, Layers, Cpu, BarChart3 } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Features | funroad - Advanced Multitenant E-commerce Platform",
    description: "Explore funroad's advanced features including hyper-isolated multi-tenancy, global CDN edge rendering, headless content management, and more.",
    keywords: ["e-commerce features", "multitenant", "marketplace", "online store", "digital commerce", "global creators", "funroad", "advanced features", "hyper-isolated multi-tenancy", "global CDN"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/features`,
      title: "Features | funroad - Advanced Multitenant E-commerce Platform",
      description: "Explore funroad's advanced features for modern e-commerce solutions.",
      siteName: "funroad",
      images: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-features.jpg` : "/og-image-features.jpg",
          width: 1200,
          height: 630,
          alt: "funroad - Features",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Features | funroad - Advanced Multitenant E-commerce Platform",
      description: "Explore funroad's advanced features for modern e-commerce solutions.",
      images: [process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-features.jpg` : "/og-image-features.jpg"],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/features`,
    },
  };
};

const features = [
  {
    title: "Hyper-Isolated Multi-tenancy",
    description: "Military-grade data isolation ensuring each merchant's data, users, and orders remain strictly private and secure.",
    icon: Layers,
    color: "bg-blue-400"
  },
  {
    title: "Global CDN Edge Rendering",
    description: "Instant page loads worldwide with Next.js 15 edge runtime optimization for superior SEO and user experience.",
    icon: Zap,
    color: "bg-yellow-400"
  },
  {
    title: "Headless Content Management",
    description: "Powered by Payload CMS 3, giving you total programmatic control over your product data and digital assets.",
    icon: Cpu,
    color: "bg-purple-400"
  },
  {
    title: "Unified Stripe Ecosystem",
    description: "Seamless payment routing and automated vendor payouts with built-in Stripe Connect support.",
    icon: ShieldCheck,
    color: "bg-green-400"
  },
  {
    title: "Advanced Market Analytics",
    description: "Deep-dive insights into sales trends, customer behavior, and tenant performance across your entire network.",
    icon: BarChart3,
    color: "bg-pink-400"
  },
  {
    title: "Scalable Media Engine",
    description: "Automated image optimization and lightning-fast asset delivery via integrated Vercel Blob storage.",
    icon: ShoppingBag,
    color: "bg-orange-400"
  }
];

export default function FeaturesPage() {
  return (
    <div className="bg-[#f4f4f0] min-h-screen">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className={cn("text-6xl font-black mb-6 text-black tracking-tight", poppins.className)}>
            Engineered for <span className="text-pink-500">Growth</span>
          </h1>
          <p className="text-xl text-neutral-600">
            Funroad isn&apos;t just a platform; it&apos;s a high-performance commerce infrastructure built with the most modern stack in the world.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="group bg-white p-10 rounded-[2.5rem] border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2">
              <div className={cn("size-16 rounded-2xl flex items-center justify-center mb-8 border-2 border-black rotate-3 group-hover:rotate-0 transition-transform", feature.color)}>
                <feature.icon className="size-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}