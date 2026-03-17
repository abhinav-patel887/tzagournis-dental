"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  "Preventive care included",
  "Discounted treatments",
  "Affordable annual membership",
  "No waiting periods",
  "No annual maximums",
  "No claims to file",
]

export function SmilePlanSection() {
  return (
    <section className="bg-accent py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              No Insurance? We&apos;ve Got a Plan for That.
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                The Tzagournis Smile Plan provides complete dental care without insurance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  No claims.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  No waiting periods.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  No annual maximums.
                </li>
              </ul>
            </div>
            <Button asChild size="lg" className="mt-4">
              <Link href="#locations">View Smile Plan Details</Link>
            </Button>
          </div>

          {/* Right Benefits */}
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
            <h3 className="text-xl font-semibold mb-6 text-foreground">
              What&apos;s Included
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
