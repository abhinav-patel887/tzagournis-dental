"use client"

import Link from "next/link"
import { 
  Stethoscope, 
  Crown, 
  Gem, 
  Sparkles, 
  Baby, 
  AlertCircle,
  ArrowRight 
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Stethoscope,
    title: "Checkup & Cleaning",
    description: "Keep your smile healthy with regular visits.",
  },
  {
    icon: Crown,
    title: "Same-Day Crowns",
    description: "Broken tooth fixed in one visit with CEREC.",
  },
  {
    icon: Gem,
    title: "Dental Implants",
    description: "Permanent replacement for missing teeth.",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    description: "Veneers, whitening, and smile makeovers.",
  },
  {
    icon: Baby,
    title: "Children's Dentistry",
    description: "Gentle dental care for kids.",
  },
  {
    icon: AlertCircle,
    title: "Emergency Dentist",
    description: "In pain? We'll see you today.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
            Whatever You Need, We&apos;ve Got You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive dental care for the whole family
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <Link 
                  href="#locations"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
