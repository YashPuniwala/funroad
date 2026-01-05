import { Metadata } from "next";
import { SignInView } from '@/modules/auth/ui/views/sign-in-view'
import { caller } from '@/trpc/server'
import { redirect } from "next/navigation"
import React from 'react'

export const dynamic = "force-dynamic"

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Sign In | funroad - Access Your Account",
    description: "Sign in to your funroad account to access your e-commerce dashboard and manage your storefronts.",
    keywords: ["sign in", "login", "e-commerce", "multitenant", "marketplace", "funroad", "account access"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/sign-in`,
      title: "Sign In | funroad - Access Your Account",
      description: "Sign in to your funroad account to manage your e-commerce storefronts.",
      siteName: "funroad",
      images: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-signin.jpg` : "/og-image-signin.jpg",
          width: 1200,
          height: 630,
          alt: "funroad - Sign In",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign In | funroad - Access Your Account",
      description: "Sign in to your funroad account to manage your e-commerce storefronts.",
      images: [process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-signin.jpg` : "/og-image-signin.jpg"],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/sign-in`,
    },
  };
};

const SignIn = async() => {
  const session = await caller.auth.session()

  if(session?.user) {
    redirect("/")
  }
  
  return (
    <SignInView />
  )
}

export default SignIn
