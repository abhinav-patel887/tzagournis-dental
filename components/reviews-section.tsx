"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const reviews = [
  {
    quote: "The entire staff is incredibly friendly and professional. They made me feel comfortable from the moment I walked in. Highly recommend!",
    name: "Sarah M.",
    location: "Westerville",
  },
  {
    quote: "The Smile Plan has been a game-changer for our family. Affordable dental care without the insurance hassle. Thank you, Tzagournis Dental!",
    name: "Michael R.",
    location: "Upper Arlington",
  },
  {
    quote: "Best dental cleaning I've ever had. The hygienist was thorough yet gentle, and Dr. Tzagournis explained everything clearly.",
    name: "Jennifer L.",
    location: "Westerville",
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-primary text-primary-foreground py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            430+ Families Trust Us With Their Smiles
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            See what our patients are saying about their experience
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <Card 
              key={index} 
              className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm transition-all duration-300 hover:bg-primary-foreground/15 hover:scale-[1.02] hover:shadow-lg"
            >
              <CardContent className="p-6 space-y-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-primary-foreground/90 leading-relaxed">
                  &quot;{review.quote}&quot;
                </p>
                
                {/* Author */}
                <div className="pt-2">
                  <p className="font-semibold text-primary-foreground">{review.name}</p>
                  <p className="text-sm text-primary-foreground/70">{review.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            asChild 
            variant="secondary" 
            size="lg"
            className="text-primary"
          >
            <Link 
              href="https://www.google.com/search?q=tzagournis+dental+reviews" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Read All Reviews
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
