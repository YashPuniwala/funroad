import { Metadata } from "next";
import { SignUpView } from '@/modules/auth/ui/views/sign-up-view'
import { caller } from '@/trpc/server'
import { redirect } from "next/navigation"
import React from 'react'

export const dynamic = "force-dynamic"

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Sign Up | funroad - Create Your Account",
    description: "Create your funroad account and start building your e-commerce storefront today. Join thousands of creators using our multitenant platform.",
    keywords: ["sign up", "register", "create account", "e-commerce", "multitenant", "marketplace", "funroad", "get started"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/sign-up`,
      title: "Sign Up | funroad - Create Your Account",
      description: "Create your funroad account and start building your e-commerce storefront today.",
      siteName: "funroad",
      images: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-signup.jpg` : "/og-image-signup.jpg",
          width: 1200,
          height: 630,
          alt: "funroad - Sign Up",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign Up | funroad - Create Your Account",
      description: "Create your funroad account and start building your e-commerce storefront today.",
      images: [process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/og-image-signup.jpg` : "/og-image-signup.jpg"],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://funroad.com"}/sign-up`,
    },
  };
};

const SignUp = async() => {
  const session = await caller.auth.session()

  if(session?.user) {
    redirect("/")
  }
  return (
      <SignUpView />
  )
}

export default SignUp
