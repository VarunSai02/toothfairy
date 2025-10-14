import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", className)}
    >
      <title>Tooth Fairy Logo</title>
      {/* Left Wing */}
      <path d="M7 11c-4 1-4 5 0 4" />
      {/* Tooth Body */}
      <path d="M12 11c-4 0-4 3 0 3s4-3 0-3" />
      <path d="M12 11c0-4 8-4 8 0 0 4-8 4-8 0" />
      <path d="M12 11c0-4-8-4-8 0 0 4 8 4 8 0" />
      {/* Right Wing */}
      <path d="M17 11c4 1 4 5 0 4" />
    </svg>
  );
}
