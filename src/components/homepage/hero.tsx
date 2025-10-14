import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "hero-background"
  );

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Smarter Dental Care Starts Here
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
          Let our AI-powered tools decode your dental plan, find the best
          providers, and maximize your benefits. Your personal guide to a
          healthier smile is just a click away.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/ai-chat">
              <Sparkles className="mr-2 h-5 w-5" />
              Chat with AI Advisor
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary" asChild>
            <Link href="/plan-recommender">
              Get Quick Recommendation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
