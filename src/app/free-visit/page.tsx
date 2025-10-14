import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Gift } from "lucide-react";
import { QualificationForm } from "./qualification-form";

export const metadata = {
  title: "Free Visit Qualification | Tooth Fairy",
  description: "Check if you qualify for a free dental visit.",
};

export default function FreeVisitPage() {
  const bannerImage = PlaceHolderImages.find(
    (img) => img.id === "free-visit-banner"
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
          <Gift className="mx-auto h-12 w-12 text-accent" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl font-headline">
            Free Dental Visit
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Answer a few questions to see if you qualify for a free dental visit and let our AI generate the necessary billing codes.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <QualificationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
