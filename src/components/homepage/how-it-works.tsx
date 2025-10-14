import { AiVideoPlayer } from "./ai-video-player";

export function HowItWorks() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase text-accent">
            Simple & Powerful
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-heading md:text-4xl font-headline">
            See Tooth Fairy in Action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Watch our AI-generated video to see how easily you can compare
            dental plans, understand costs, and find the right care for you.
          </p>
        </div>
        <div className="mt-10">
          <AiVideoPlayer />
        </div>
      </div>
    </section>
  );
}
