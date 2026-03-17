"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Award, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const doctors = [
  {
    name: "Dr. George Tzagournis",
    role: "Founder & Lead Dentist",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dJCL8txhGe6nOUbKeAevC3DtRgaT3w.png",
    bio: "With decades of experience and a passion for patient care, Dr. George Tzagournis founded Tzagournis Dental Group to provide exceptional dental care to the Columbus community. His commitment to staying at the forefront of dental technology, including CEREC same-day crowns, ensures patients receive the most advanced treatments available.",
    credentials: ["The Ohio State University College of Dentistry", "American Dental Association Member", "CEREC Certified"],
  },
  {
    name: "Dr. Daniel Bell",
    role: "General & Restorative Dentist",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VTHRecx4aq5VpaLIwcFqixxAGjnr4B.png",
    bio: "Dr. Daniel Bell brings a wealth of knowledge and a gentle approach to dentistry. He specializes in restorative procedures and takes pride in helping patients achieve optimal oral health. His thorough explanations ensure patients understand every step of their treatment plan.",
    credentials: ["The Ohio State University College of Dentistry", "Academy of General Dentistry Member", "Restorative Dentistry Specialist"],
  },
  {
    name: "Dr. Brandon Simon",
    role: "General & Cosmetic Dentist",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Eyi649VHCdBGaEbiSpuEKdqWSLQlHE.png",
    bio: "Dr. Brandon Simon combines artistry with dental expertise to deliver stunning cosmetic results. His attention to detail and patient-centered approach make him a favorite among those seeking smile makeovers. He is dedicated to making every patient feel comfortable and confident.",
    credentials: ["Case Western Reserve University School of Dental Medicine", "American Academy of Cosmetic Dentistry", "Invisalign Certified Provider"],
  },
]

const legacyDoctor = {
  name: "Dr. Steve Walton",
  role: "Legacy",
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5RF1AfgTd60iI0zrqtJWNaJEwoh1L.png",
  bio: "Dr. Steve Walton's legacy at Tzagournis Dental Group spans many years of dedicated service to our patients. His warm personality and exceptional care have touched countless families in the Columbus area. We honor his contributions to our practice and the community.",
  credentials: ["The Ohio State University College of Dentistry", "40+ Years of Service", "Beloved by Generations of Patients"],
}

export function DoctorsSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedDoctor, setExpandedDoctor] = useState<number | null>(null)

  return (
    <section id="about" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header with collapsible trigger */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
            Meet Our Dentists
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Get to Know the Experts
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Our practice is extremely fortunate to have three highly skilled dentists in Upper Arlington who have decades of experience. On top of their clinical expertise, our dentists stand out in their willingness to take extra time to explain all recommended procedures to their patients so they fully understand their options and feel at ease during every step of the dental process.
          </p>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-2"
          >
            {isExpanded ? "Hide" : "Meet"} Our Doctors
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Collapsible content */}
        <div 
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* Current Doctors Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-12 mb-12">
            {doctors.map((doctor, index) => (
              <Card 
                key={index} 
                className="overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedDoctor(expandedDoctor === index ? null : index)}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{doctor.name}</h3>
                    <p className="text-primary font-medium">{doctor.role}</p>
                  </div>
                  
                  {/* Expandable bio */}
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      expandedDoctor === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm mb-4 pt-3">
                      {doctor.bio}
                    </p>
                    <div className="space-y-2">
                      {doctor.credentials.map((credential, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          {i === 0 ? (
                            <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                          ) : (
                            <Award className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                          <span>{credential}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                    {expandedDoctor === index ? "Show Less" : "Learn More"}
                    {expandedDoctor === index ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Legacy Doctor */}
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Legacy</span>
            </div>
            <Card className="overflow-hidden border-border/50 shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={legacyDoctor.image}
                  alt={legacyDoctor.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <CardContent className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{legacyDoctor.name}</h3>
                  <p className="text-primary font-medium">{legacyDoctor.role}</p>
                </div>
                <p className="text-muted-foreground text-sm">
                  {legacyDoctor.bio}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
