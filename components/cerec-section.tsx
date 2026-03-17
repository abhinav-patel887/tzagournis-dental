"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CERECSection() {
  return (
    <section id="about" className="bg-secondary py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance leading-tight">
              Broken tooth fixed.
              <br />
              In one visit.
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                With CEREC technology we scan, design, and create your custom dental crown in a single appointment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  No temporary crowns.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  No second visit.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Done in about 90 minutes.
                </li>
              </ul>
            </div>
            <Button asChild size="lg" className="mt-4">
              <Link href="#services">Learn About Same-Day Crowns</Link>
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/cerec-machine.jpg"
              alt="CEREC dental technology for same-day crowns"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
