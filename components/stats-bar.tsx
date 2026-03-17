"use client"

import { useEffect, useState, useRef } from "react"
import { Star, MapPin, Zap, User } from "lucide-react"

function FiveStarsIcon({ className }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 justify-center ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" />
      ))}
    </div>
  )
}

function DentistsIcon({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-end justify-center ${className}`}>
      {/* Left dentist - slightly back */}
      <User className="h-6 w-6 opacity-70 -mr-1 mb-0.5" />
      {/* Center dentist - front and slightly larger */}
      <User className="h-7 w-7 relative z-10" />
      {/* Right dentist - slightly back */}
      <User className="h-6 w-6 opacity-70 -ml-1 mb-0.5" />
    </div>
  )
}

const stats = [
  { icon: "stars", value: 430, suffix: "+", label: "Five-Star Reviews" },
  { icon: "dentists", value: 3, suffix: "", label: "Expert Dentists" },
  { icon: "location", value: 2, suffix: "", label: "Columbus Locations" },
  { icon: "zap", value: 1, suffix: " Visit", label: "Same-Day CEREC Crowns" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const duration = 2000
            const steps = 60
            const increment = value / steps
            let current = 0

            const timer = setInterval(() => {
              current += increment
              if (current >= value) {
                setCount(value)
                clearInterval(timer)
              } else {
                setCount(Math.floor(current))
              }
            }, duration / steps)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold">
      {count}{suffix}
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="h-8 flex items-center justify-center opacity-80">
                {stat.icon === "stars" && <FiveStarsIcon />}
                {stat.icon === "dentists" && <DentistsIcon />}
                {stat.icon === "location" && <MapPin className="h-8 w-8" />}
                {stat.icon === "zap" && <Zap className="h-8 w-8" />}
              </div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-sm md:text-base opacity-90 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
