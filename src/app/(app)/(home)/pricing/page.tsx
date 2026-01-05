import React from "react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const plans = [
  {
    name: "Founder",
    price: "$0",
    description: "Perfect for testing your first concept",
    features: [
      "1 Brand Storefront",
      "50 Product Catalog",
      "Standard Analytics",
      "Community Support",
      "funroad.com Subdomain"
    ],
  },
  {
    name: "Scale",
    price: "$49",
    description: "The sweet spot for growing brands",
    features: [
      "5 Brand Storefronts",
      "Unlimited Products",
      "Custom Domain Support",
      "Advanced Sales Reports",
      "Priority Email Support",
      "0% Transaction Fees"
    ],
    recommended: true,
  },
  {
    name: "Network",
    price: "$199",
    description: "For established marketplace operators",
    features: [
      "Unlimited Storefronts",
      "Full API Access",
      "White-label Dashboard",
      "Dedicated Infrastructure",
      "Account Manager",
      "Custom Integrations"
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="bg-[#f4f4f0] min-h-screen">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className={cn("text-6xl font-black mb-6 text-black tracking-tight", poppins.className)}>
            Transparent <span className="text-pink-500">Pricing</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Scale your marketplace without hidden costs. Choose the tier that matches your current ambition.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={cn(
                "relative bg-white p-12 rounded-[3rem] border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col transition-transform hover:scale-[1.02]",
                plan.recommended && "bg-yellow-50 ring-4 ring-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-pink-500 text-black text-sm font-black px-6 py-2 rounded-full border-2 border-black flex items-center gap-2 whitespace-nowrap">
                  <Star className="size-4 fill-black" /> RECOMMENDED FOR GROWTH
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-black">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-xl text-neutral-500 font-bold">/month</span>}
                </div>
                <p className="text-neutral-600 font-medium">{plan.description}</p>
              </div>
              
              <ul className="space-y-5 mb-12 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-4 text-lg">
                    <div className="size-6 bg-green-400 rounded-full border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-4 text-black stroke-[3]" />
                    </div>
                    <span className="font-semibold text-neutral-800">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={cn(
                  "w-full h-16 text-xl font-black rounded-2xl border-2 border-black transition-all",
                  plan.recommended 
                    ? "bg-black text-white hover:bg-pink-500 hover:text-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]" 
                    : "bg-white text-black hover:bg-neutral-100"
                )}
              >
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}