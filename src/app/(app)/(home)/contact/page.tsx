import React from "react";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default function ContactPage() {
  return (
    <div className="bg-[#f4f4f0] min-h-screen">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className={cn("text-6xl font-black mb-6 text-black tracking-tight", poppins.className)}>
              Get in <span className="text-pink-500">Touch</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Ready to start your multitenant journey? Our team of commerce experts is standing by to help you scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="size-12 bg-blue-400 rounded-xl border-2 border-black flex items-center justify-center mb-4">
                  <Mail className="size-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-neutral-600">hello@funroad.com</p>
                <p className="text-neutral-600 text-sm">Response within 24 hours</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="size-12 bg-green-400 rounded-xl border-2 border-black flex items-center justify-center mb-4">
                  <MessageCircle className="size-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-neutral-600">Available Mon-Fri</p>
                <p className="text-neutral-600 text-sm">9am - 6pm EST</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="size-12 bg-yellow-400 rounded-xl border-2 border-black flex items-center justify-center mb-4">
                  <MapPin className="size-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Headquarters</h3>
                <p className="text-neutral-600">Digital Nomad Ave, Cloud City</p>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white p-12 rounded-[3rem] border-3 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="font-black text-lg uppercase tracking-wider">Full Name</label>
                    <Input 
                      placeholder="Jane Doe" 
                      className="h-16 border-2 border-black rounded-2xl px-6 text-lg focus-visible:ring-0 focus-visible:border-pink-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="font-black text-lg uppercase tracking-wider">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="jane@company.com" 
                      className="h-16 border-2 border-black rounded-2xl px-6 text-lg focus-visible:ring-0 focus-visible:border-pink-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="font-black text-lg uppercase tracking-wider">Subject</label>
                  <Input 
                    placeholder="Inquiry about Scale Plan" 
                    className="h-16 border-2 border-black rounded-2xl px-6 text-lg focus-visible:ring-0 focus-visible:border-pink-500 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <label className="font-black text-lg uppercase tracking-wider">Message Details</label>
                  <Textarea 
                    placeholder="Tell us about your project goals..." 
                    className="min-h-[200px] border-2 border-black rounded-[2rem] p-8 text-lg focus-visible:ring-0 focus-visible:border-pink-500 transition-colors"
                  />
                </div>

                <Button 
                  className="w-full h-20 bg-black text-white text-2xl font-black rounded-2xl border-2 border-black hover:bg-pink-500 hover:text-black transition-all flex items-center gap-4 group"
                >
                  SEND MESSAGE <Send className="size-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}