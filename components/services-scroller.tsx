"use client"

import { useRef } from "react"
import {
  Stethoscope,
  Zap,
  Users,
  Sparkles,
  Baby,
  Heart,
  Brain,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const serviceCategories = [
  {
    icon: Stethoscope,
    title: "I Need a Checkup & Cleaning",
    services: [
      "Dental Checkups & Teeth Cleanings",
      "Oral Cancer Screening",
      "Nightguards for Bruxism",
      "Periodontal Therapy",
      "Fluoride Treatment",
      "At-Home Dental Hygiene",
    ],
  },
  {
    icon: Zap,
    title: "I Have a Cavity or Broken Tooth",
    services: [
      "Dental Crowns",
      "Tooth-Colored Fillings",
      "CEREC One-Visit Crowns",
    ],
  },
  {
    icon: Users,
    title: "I am Missing One or More Teeth",
    services: [
      "Dental Bridges",
      "Dentures",
      "Dental Implants",
    ],
  },
  {
    icon: Sparkles,
    title: "I Want to Enhance My Smile",
    services: [
      "Teeth Whitening",
      "Veneers",
      "Metal-Free Restorations",
      "Direct Bonding",
    ],
  },
  {
    icon: Baby,
    title: "I Need a Dentist for My Child",
    services: [
      "Dental Sealants",
      "Silver Diamine Fluoride",
      "Athletic Mouthguards",
      "Special Needs Children's Dentistry",
      "Frenectomies",
      "Pulp Therapy",
    ],
  },
  {
    icon: Heart,
    title: "I am Scared of the Dentist",
    services: [
      "Oral Conscious Sedation",
      "Nitrous Oxide Sedation",
      "IV Sedation",
    ],
  },
  {
    icon: Brain,
    title: "I Have Pain in My Jaw",
    services: [
      "Causes of TMD",
      "Diagnosing TMD",
      "Occlusal Splints",
    ],
  },
  {
    icon: AlertTriangle,
    title: "I am in Pain & Need Help",
    services: [
      "How We Treat Dental Emergencies",
      "The Most Common Dental Emergencies",
      "Understanding the Cost of Dental Emergencies",
      "Keys to Preventing Dental Emergencies",
      "Tooth Extractions",
      "Wisdom Tooth Extractions",
    ],
  },
]

export function ServicesScroller() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              How Can We Help You?
            </h3>
            <p className="text-muted-foreground">
              Select what best describes your needs
            </p>
          </div>
          
          {/* Navigation arrows */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>

        {/* Scrollable container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {serviceCategories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] snap-start group"
            >
              <div className="bg-background border border-border/50 rounded-xl p-6 h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer">
                {/* Icon */}
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                
                {/* Title */}
                <h4 className="font-semibold text-foreground mb-4 text-lg">
                  {category.title}
                </h4>
                
                {/* Services list */}
                <ul className="space-y-2">
                  {category.services.map((service, i) => (
                    <li 
                      key={i} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center gap-1 mt-4 md:hidden">
          <span className="text-xs text-muted-foreground">Swipe to see more</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground animate-pulse" />
        </div>
      </div>
    </section>
  )
}
