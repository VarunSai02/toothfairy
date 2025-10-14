import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Building, MapPin } from "lucide-react";
import { ProviderSearch } from "./provider-search";

export const metadata = {
  title: "Find a Provider | Tooth Fairy",
  description: "Search for dental providers and offices near you.",
};

export default function FindProviderPage() {
  const bannerImage = PlaceHolderImages.find(
    (img) => img.id === "find-provider-banner"
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
          <MapPin className="mx-auto h-12 w-12 text-accent" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl font-headline">
            Find Your Dentist
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Search for dental offices by name, location, or insurance plan. Filter by services and financing options to find the perfect match.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ProviderSearch />
        </div>
      </section>
    </div>
  );
}
