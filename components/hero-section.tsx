"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Shield, Clock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

const trustIndicators = [
  { icon: Star, label: "430+ Reviews", filled: true },
  { icon: Shield, label: "ADA Member" },
  { icon: Clock, label: "Same-Day CEREC" },
  { icon: CreditCard, label: "Accepting Insurance" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                Columbus&apos;s Most Trusted Dental Group
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Two locations. Three expert dentists.
                <br />
                430+ five-star reviews.
                <br />
                Accepting new patients today.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base px-8">
                <Link href="#locations">Book at Westerville</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8">
                <Link href="#locations">Book at Upper Arlington</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              {trustIndicators.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  {item.filled ? (
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  ) : (
                    <item.icon className="h-5 w-5 text-primary" />
                  )}
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[500px] h-[300px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero-patient.jpg"
              alt="Happy patient in a bright, modern dental clinic"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
