"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function AnimatedGradientHero() {
  return (
    <section className="py-24 relative overflow-hidden mb-12 text-center">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 animate-gradient bg-radial-blue" />
      </div>

      {/* Content */}
      <div className="container max-w-4xl relative">
        <h1 className="text-5xl font-bold mb-8 text-primary">
          Small Business Owners: Are You Leaving Money on the Table?
        </h1>
        <h2 className="text-3xl font-bold mb-8">
          <span className="text-accent">STOP</span> Letting Your Competitors{" "}
          <span className="text-accent">STEAL</span> Your Customers! Your Raving
          Fans Hold the Key… Are You Using It?
        </h2>
        <Button asChild className="text-lg">
          <Link href="/sign-in">Start using</Link>
        </Button>
      </div>
    </section>
  );
}
