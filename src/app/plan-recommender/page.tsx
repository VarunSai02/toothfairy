import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { RecommendationForm } from "./recommendation-form";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Plan Recommender | Tooth Fairy",
  description: "Get AI-powered dental plan recommendations.",
};

export default function PlanRecommenderPage() {
  const bannerImage = PlaceHolderImages.find(
    (img) => img.id === "plan-recommender-banner"
  );

  return (
    <div>
      <section className="relative w-full bg-primary/10 py-20 md:py-24">
        {bannerImage && (
          <>
            <Image
              src={bannerImage.imageUrl}
              alt={bannerImage.description}
              layout="fill"
              objectFit="cover"
              className="opacity-10"
              data-ai-hint={bannerImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </>
        )}
        <div className="container relative mx-auto px-4 text-center">
          <Sparkles className="mx-auto h-12 w-12 text-accent" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl font-headline">
            AI Plan Recommender
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Submit your dental treatment plan and let our AI find the best insurance options and cost savings for you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <RecommendationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
