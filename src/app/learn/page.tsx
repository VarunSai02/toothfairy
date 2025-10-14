import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "Learn | Tooth Fairy",
  description: "Learn about dental care, insurance, and more.",
};

const FAQ_DATA = [
    {
        question: "What's the difference between a PPO, HMO, and Indemnity plan?",
        answer: "A PPO (Preferred Provider Organization) offers a network of dentists you can see at lower rates, but still provides some coverage for out-of-network providers. An HMO (Health Maintenance Organization) requires you to use dentists within its network, usually with lower premiums. An Indemnity plan gives you the freedom to see any dentist without a network, but you may have to pay upfront and get reimbursed."
    },
    {
        question: "What is a deductible and how does it work?",
        answer: "A deductible is the amount of money you must pay out-of-pocket for dental services before your insurance plan starts to pay. For example, if your deductible is $50, you pay the first $50 of covered services yourself. After that, your insurance begins to share the cost."
    },
    {
        question: "What are preventative, basic, and major services?",
        answer: "Preventative services are routine procedures like cleanings, exams, and x-rays, which are often fully covered. Basic services include common procedures like fillings and simple extractions. Major services are more complex and expensive treatments like crowns, bridges, and root canals. Coverage levels typically decrease from preventative to major."
    },
    {
        question: "How do I understand my Explanation of Benefits (EOB)?",
        answer: "An EOB is not a bill. It's a statement from your insurance company that explains what services were billed, how much your plan paid, and what you owe the provider. Key things to look for are the 'amount billed', 'plan discount', 'amount paid by plan', and 'patient responsibility'."
    },
     {
        question: "What is the difference between in-network and out-of-network?",
        answer: "In-network providers have a contract with your insurance company to provide services at a discounted rate. Going to an in-network dentist will almost always be cheaper. Out-of-network providers don't have a contract, so your insurance will cover less of the cost, and you'll be responsible for a larger portion of the bill."
    }
]

export default function LearnPage() {
  const bannerImage = PlaceHolderImages.find(
    (img) => img.id === "learn-banner"
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
          <BookOpen className="mx-auto h-12 w-12 text-accent" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl font-headline">
            Dental Knowledge Hub
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Empower yourself with knowledge. Understand dental insurance, common terms, and how to make the most of your benefits.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
            <Accordion type="single" collapsible className="w-full">
                {FAQ_DATA.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </section>
    </div>
  );
}
