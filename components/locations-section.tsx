"use client"

import Link from "next/link"
import { MapPin, Phone, Clock, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { LocationId } from "@/types/booking"

const locations = [
  {
    id: "westerville" as LocationId,
    name: "Westerville Location",
    address: "385 County Line Rd W Suite 100",
    city: "Westerville, OH 43082",
    phone: "(614) 882-4032",
    hours: [
      { day: "Monday", time: "8:00 am – 5:00 pm" },
      { day: "Tuesday", time: "8:00 am – 6:00 pm" },
      { day: "Wednesday", time: "8:00 am – 5:00 pm" },
      { day: "Thursday", time: "7:00 am – 5:00 pm" },
      { day: "Friday", time: "7:00 am – 1:00 pm" },
    ],
    mapUrl: "https://maps.google.com/?q=385+County+Line+Rd+W+Suite+100+Westerville+OH",
  },
  {
    id: "upperarlington" as LocationId,
    name: "Upper Arlington Location",
    address: "5025 Arlington Centre Blvd #220",
    city: "Upper Arlington, OH",
    phone: "(614) 457-1481",
    hours: [
      { day: "Monday", time: "7:30 am – 4:00 pm" },
      { day: "Tuesday", time: "7:30 am – 4:00 pm" },
      { day: "Wednesday", time: "7:30 am – 4:00 pm" },
      { day: "Thursday", time: "7:00 am – 5:00 pm" },
      { day: "Friday", time: "Closed" },
    ],
    mapUrl: "https://maps.google.com/?q=5025+Arlington+Centre+Blvd+220+Upper+Arlington+OH",
  },
]

interface LocationsSectionProps {
  onBook: (location: LocationId | null) => void
}

export function LocationsSection({ onBook }: LocationsSectionProps) {
  return (
    <section id="locations" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
            Two Convenient Columbus Locations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the location that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {locations.map((location, index) => (
            <Card key={index} className="overflow-hidden border-border/50 shadow-lg">
              <div className="h-48 bg-muted relative">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.address + ' ' + location.city)}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${location.name}`}
                  className="absolute inset-0"
                />
              </div>
              
              <CardContent className="p-6 space-y-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {location.name}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground">{location.address}</p>
                      <p className="text-foreground">{location.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <a 
                      href={`tel:${location.phone.replace(/\D/g, '')}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-foreground font-medium text-sm mb-2">Office Hours</p>
                      {location.hours.map((hour, i) => (
                        <div key={i} className="flex justify-between text-sm gap-4">
                          <span className="text-muted-foreground">{hour.day}</span>
                          <span className={hour.time === "Closed" ? "text-destructive" : "text-foreground"}>
                            {hour.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Link>
                  </Button>
                  <Button className="flex-1" onClick={() => onBook(location.id)}>
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
