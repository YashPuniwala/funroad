import { Metadata } from "next";
import React from "react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Rocket, Target } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "About Us | funroad - Multitenant E-commerce Platform",
    description: "Learn about funroad's mission to democratize e-commerce through our revolutionary multitenant platform designed for global creators.",
    keywords: ["about funroad", "e-commerce", "multitenant", "marketplace", "digital commerce", "global creators", "funroad", "our mission", "our vision"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/about`,
      title: "About Us | funroad - Multitenant E-commerce Platform",
      description: "Learn about funroad's mission to democratize e-commerce through our revolutionary multitenant platform.",
      siteName: "funroad",
      images: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-about.jpg` : "/og-image-about.jpg",
          width: 1200,
          height: 630,
          alt: "funroad - About Us",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | funroad - Multitenant E-commerce Platform",
      description: "Learn about funroad's mission to democratize e-commerce through our revolutionary multitenant platform.",
      images: [process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-about.jpg` : "/og-image-about.jpg"],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/about`,
    },
  };
};

export default function AboutPage() {
  return (
    <div className="bg-[#f4f4f0] min-h-screen">
      <div className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className={cn("text-6xl font-black mb-6 text-black tracking-tight", poppins.className)}>
            About <span className="text-pink-500">funroad</span>
          </h1>
          <p className="text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing digital commerce through a unified multitenant ecosystem designed for the next generation of global creators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-10 rounded-3xl border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="text-pink-500" /> Our Mission
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              We exist to dismantle the technical barriers of online retail. Funroad provides a high-performance, secure, and infinitely scalable infrastructure that allows entrepreneurs to deploy sophisticated multi-vendor marketplaces in a fraction of the time.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="text-pink-500" /> Our Vision
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              To build the world&apos;`s most adaptive commerce engine—one where every brand, no matter how niche, can command its own digital space while leveraging the collective power of a modern, enterprise-grade backend.
            </p>
          </div>
        </div>

        <div className="bg-black text-white p-12 rounded-[3rem] mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center">The funroad Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-pink-400 text-4xl mb-4 font-black">01</div>
              <h3 className="text-xl font-bold mb-2">Radical Simplicity</h3>
              <p className="text-neutral-400 text-sm">Complex architecture hidden behind an intuitive, effortless interface.</p>
            </div>
            <div>
              <div className="text-pink-400 text-4xl mb-4 font-black">02</div>
              <h3 className="text-xl font-bold mb-2">Merchant Autonomy</h3>
              <p className="text-neutral-400 text-sm">Every tenant is their own master, with full control over their brand identity.</p>
            </div>
            <div>
              <div className="text-pink-400 text-4xl mb-4 font-black">03</div>
              <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
              <p className="text-neutral-400 text-sm">Top-tier encryption and isolation protocols protecting every transaction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}