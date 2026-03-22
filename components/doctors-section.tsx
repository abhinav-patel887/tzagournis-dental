"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Award, GraduationCap, ArrowLeft } from "lucide-react"
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
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)

  const handleKnowMore = (index: number) => {
    setSelectedDoctor(index)
  }

  const handleBack = () => {
    setSelectedDoctor(null)
  }

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
          {/* Selected Doctor Full View */}
          {selectedDoctor !== null && (
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="bg-background border border-border/50 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image - Fill completely */}
                  <div className="relative h-96 md:h-full overflow-hidden bg-muted">
                    <Image
                      src={doctors[selectedDoctor].image}
                      alt={doctors[selectedDoctor].name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold text-foreground mb-2">
                          {doctors[selectedDoctor].name}
                        </h3>
                        <p className="text-lg text-primary font-semibold">
                          {doctors[selectedDoctor].role}
                        </p>
                      </div>
                      
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {doctors[selectedDoctor].bio}
                      </p>
                      
                      <div className="space-y-3">
                        <p className="font-semibold text-foreground text-sm">Credentials & Certifications:</p>
                        {doctors[selectedDoctor].credentials.map((credential, i) => (
                          <div key={i} className="flex items-start gap-3 text-muted-foreground">
                            {i === 0 ? (
                              <GraduationCap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            ) : (
                              <Award className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            )}
                            <span className="text-sm">{credential}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Show Less button at bottom */}
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all self-start"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Show Less
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Current Doctors Grid */}
          {selectedDoctor === null && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mt-12 mb-12 justify-items-center">
                {doctors.map((doctor, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 origin-top w-full max-w-xs"
                  >
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted max-h-64">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <div>
                        <h3 className="text-base font-bold text-foreground">{doctor.name}</h3>
                        <p className="text-xs text-primary font-medium">{doctor.role}</p>
                      </div>
                      
                      <button 
                        onClick={() => handleKnowMore(index)}
                        className="text-xs text-primary font-medium hover:underline flex items-center gap-1 transition-all hover:gap-2"
                      >
                        Know More
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Legacy Doctor */}
              <div className="mt-20 pt-12 border-t border-border/50">
                <div className="text-center mb-12">
                  <span className="text-sm font-bold text-primary uppercase tracking-widest">🌟 Legacy 🌟</span>
                </div>
                <div className="max-w-5xl mx-auto">
                  <div className="bg-background border border-border/50 rounded-2xl overflow-hidden shadow-lg">
                    <div className="grid md:grid-cols-3 gap-0">
                      {/* Image - 1 column */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                        <Image
                          src={legacyDoctor.image}
                          alt={legacyDoctor.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      
                      {/* Content - 2 columns */}
                      <div className="md:col-span-2 p-10 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Legacy</span>
                            <h3 className="text-4xl font-bold text-foreground mt-3">
                              {legacyDoctor.name}
                            </h3>
                            <p className="text-lg text-muted-foreground font-medium mt-2">
                              Honored for Lifelong Service
                            </p>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed text-base">
                            {legacyDoctor.bio}
                          </p>
                          
                          <div className="space-y-3 pt-2">
                            {legacyDoctor.credentials.map((credential, i) => (
                              <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Award className="h-5 w-5 text-primary flex-shrink-0" />
                                <span>{credential}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Quote section */}
                        <div className="border-t border-border/30 pt-6">
                          <p className="italic text-muted-foreground text-base">
                            "A smile is the most beautiful curve on a human face, and we're honored to help create yours."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
