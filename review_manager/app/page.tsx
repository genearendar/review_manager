import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import ScriptLoader from "@/components/scriptLoader";
export default async function Index() {
  return (
    <>
      <main>
        <section className="py-24">
          <div className="container max-w-4xl">
            <h1 className="text-5xl font-bold mb-8 text-primary ">
              Small Business Owners: Are You Leaving Money on the Table?
            </h1>
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-accent">STOP</span> Letting Your Competitors{" "}
              <span className="text-accent">STEAL</span> Your Customers! Your
              Raving Fans Hold the Key… Are You Using It?
            </h2>
          </div>
        </section>
        <section className="pb-12">
          <div className="container max-w-4xl">
            <p className="mb-4 text-lg">
              <span className="font-bold">Imagine this:</span> You've got
              customers raving about your business… but those powerful
              testimonials are just sitting there, doing nothing.
            </p>
            <h2 className="text-3xl font-bold mb-4 text-accent text-center underline">
              Here’s the cold, hard truth:
            </h2>
            <p className="text-lg font-bold italic text-center">
              If those testimonials aren't front and center on your website,
              you're losing out on crucial trust and credibility. Potential
              customers are searching for social proof, and if they don't find
              it on your site, they'll find it on your competitors'. It's time
              to stop leaving money on the table.
            </p>
          </div>
        </section>
        <section className="pb-12">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-primary text-center">
              Unleash the Power of Your Reviews with RaveBoard
            </h2>
            <p className="mb-4">
              RaveBoard turns your best reviews into a 24/7 sales machine that
              builds trust and attracts new customers on autopilot. No coding.
              No hassle. Just simple, powerful results. With just a few clicks,
              you can create a stunning, mobile-friendly review widget that
              works on any website, giving your happy customers the spotlight
              they deserve.
            </p>
          </div>
        </section>
        <section className="pb-12">
          <ScriptLoader />
        </section>
        <section className="pb-12">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-primary text-center">
              Get Your Reviews Working for You in Just 3 Steps:
            </h2>
            <ol className="list-decimal pl-6">
              <li className="mb-4">
                Collect Reviews: Easily gather all your best reviews in one
                central hub. No more scattered testimonials—keep everything
                organized and accessible.
              </li>
              <li className="mb-4">
                Customize Your Widget: Choose from a library of gorgeous,
                high-converting templates and tweak them to perfectly match your
                brand. Make it your own in seconds.
              </li>
              <li className="mb-4">
                Embed & Shine: Add the widget to your website in minutes—no tech
                skills required. Simply copy and paste a short code, and watch
                your social proof explode.
              </li>
            </ol>
          </div>
        </section>
        <section className="pb-12">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-primary text-center">
              Here's Why Smart Business Owners Choose RaveBoard to Dominate
              Their Market:
            </h2>
            <ul className="list-disc pl-6">
              <li className="mb-4">
                Build Instant Trust & Skyrocket Sales: Consumers trust reviews
                more than ads. Let your happy customers do the selling for you,
                building instant credibility and driving more sales than ever
                before. Imagine the boost to your bottom line!
              </li>
              <li className="mb-4">
                Crush Your Competition & Become the Go-To Authority: Don’t let
                your competitors outshine you. Display your rave reviews
                prominently and position yourself as the trusted leader in your
                industry. Stop playing catch-up and start dominating.
              </li>
              <li className="mb-4">
                Reclaim Your Time & Focus on Explosive Growth: Stop wasting
                precious time wrestling with tech or manually updating
                testimonials. Let RaveBoard handle the heavy lifting while you
                focus on what matters most: growing your business and scaling
                your profits.
              </li>
            </ul>
          </div>
        </section>

        <section className="pb-12">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-primary text-center">
              Ready to Stop Losing Customers and Start Showcasing Your Raving
              Fans?
            </h2>
            <p className="mb-6 text-center text-lg">
              Start showcasing your rave reviews today—it’s free to get started!
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/sign-up">Showcase my reviews</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
