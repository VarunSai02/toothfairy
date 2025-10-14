import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "../ui/card";
import { CheckCircle } from "lucide-react";

export function MissionValues() {
  const missionImage = PlaceHolderImages.find(
    (img) => img.id === "mission-image"
  );

  const values = [
    {
      title: "Transparency",
      description: "We demystify dental costs and insurance jargon, providing clear and honest information.",
    },
    {
      title: "Accessibility",
      description: "Everyone deserves quality dental care. Our tools are designed to be simple and available to all.",
    },
    {
      title: "Empowerment",
      description: "We give you the knowledge and resources to make confident decisions about your dental health.",
    },
  ];

  return (
    <section className="w-full bg-card py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            <span className="text-sm font-semibold uppercase text-accent">Our Commitment</span>
            <h2 className="text-3xl font-bold tracking-tight text-heading md:text-4xl font-headline">
              A Healthier Smile for Everyone
            </h2>
            <p className="text-lg text-muted-foreground">
              Our mission is to make navigating dental care effortless and
              affordable. We believe that by providing powerful, easy-to-use
              tools, we can help people take control of their oral health, save
              money, and smile brighter.
            </p>
            <div className="space-y-4 pt-4">
              {values.map((value) => (
                <div key={value.title} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            {missionImage && (
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={missionImage.imageUrl}
                    alt={missionImage.description}
                    width={600}
                    height={400}
                    className="aspect-[3/2] object-cover"
                    data-ai-hint={missionImage.imageHint}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
