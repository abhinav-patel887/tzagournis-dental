"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, MapPin, Calendar, Clock, Shield, Users, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BookingData } from "@/types/booking"

interface BookingSuccessProps {
  isOpen: boolean
  data: BookingData | null
  onClose: () => void
}

export function BookingSuccess({ isOpen, data, onClose }: BookingSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen || !data) return null

  const handleGetDirections = () => {
    const address = data.location.id === "westerville" 
      ? "385 County Line Rd W Suite 100, Westerville, OH 43082"
      : "5025 Arlington Centre Blvd #220, Upper Arlington, OH"
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, "_blank")
  }

  const handleAddToCalendar = () => {
    const eventTitle = `Dental Appointment - ${data.situation}`
    const eventDate = new Date().toISOString().split('T')[0]
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tzagournis Dental//EN
BEGIN:VEVENT
DTSTART:${eventDate}T${data.selectedTime.replace(/[^0-9]/g, '').slice(0, 4)}00Z
DTEND:${eventDate}T${(parseInt(data.selectedTime.replace(/[^0-9]/g, '').slice(0, 2)) + 1).toString().padStart(2, '0')}0000Z
SUMMARY:${eventTitle}
LOCATION:${data.location.name}
END:VEVENT
END:VCALENDAR`
    
    const blob = new Blob([icsContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "appointment.ics"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-4 animate-confetti"
              style={{
                left: Math.random() * 100 + "%",
                backgroundColor: ["#8B5CF6", "#F59E0B", "#3B82F6", "#EC4899", "#10B981"][i % 5],
                animation: `confetti ${2.5}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes confetti {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="bg-background rounded-2xl shadow-2xl w-[95vw] md:w-[60vw] h-[90vh] md:h-[60vh] relative p-4 md:p-6 flex flex-col justify-between overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1.5 hover:bg-muted rounded-lg transition-colors z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex-1 flex flex-col h-full space-y-3 md:space-y-4">
          {/* Header Row: Checkmark & Text */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-bounce flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-foreground leading-tight">You're all set!</h2>
              <p className="text-xs text-muted-foreground">
                Confirmed for {data.patientName}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 flex-1 min-h-0">
            {/* Left Column: Doctor & Actions & Video & Patients */}
            <div className="flex-1 flex flex-col gap-3 min-h-0">
              {/* Doctor Card */}
              <div className="bg-primary/10 p-3 rounded-xl border border-primary/20 flex items-center gap-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dJCL8txhGe6nOUbKeAevC3DtRgaT3w.png"
                  alt="Dr. George Tzagournis"
                  width={40}
                  height={40}
                  className="rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="font-semibold text-sm text-foreground leading-tight">Dr. George Tzagournis</p>
                  <p className="text-[10px] text-muted-foreground">Your dentist is ready</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" onClick={handleGetDirections} className="w-full text-xs h-8 flex items-center justify-center gap-1">
                  <MapPin className="h-3 w-3" /> Directions
                </Button>
                <Button size="sm" onClick={handleAddToCalendar} variant="outline" className="w-full text-xs h-8 flex items-center justify-center gap-1">
                  <Calendar className="h-3 w-3" /> Calendar
                </Button>
              </div>

              {/* Patient Names */}
              <div className="bg-muted/50 p-2.5 rounded-lg border border-border/50 flex-1 min-h-[60px] flex flex-col mt-1">
                <div className="flex items-center gap-1.5 mb-1.5 text-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">Patients</span>
                </div>
                <div className="overflow-y-auto pr-1 text-xs space-y-1">
                  <div className="flex justify-between items-center bg-background/50 rounded px-1.5 py-1 border border-border/30">
                    <span className="font-medium truncate mr-2">{data.patientName}</span>
                    <span className="text-[10px] text-muted-foreground truncate">{data.situation}</span>
                  </div>
                  {data.familyMembers.map((member, i) => (
                    <div key={i} className="flex justify-between items-center bg-background/50 rounded px-1.5 py-1 border border-border/30">
                      <span className="font-medium truncate mr-2">{member.name}</span>
                      <span className="text-[10px] text-muted-foreground truncate">{member.service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Placeholder */}
              {data.isAnxious && (
                <div className="bg-muted rounded-lg w-full flex items-center justify-center border border-dashed border-border p-2">
                  <div className="flex items-center gap-3">
                    <button className="inline-flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform shrink-0">
                      <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                    <div className="text-left">
                      <p className="text-xs font-medium">Calming Video</p>
                      <p className="text-[10px] text-muted-foreground">Watch before visit</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Appointment Details */}
            <div className="flex-[1.2] bg-primary/5 p-3 rounded-xl border border-primary/20 flex flex-col flex-shrink-0 min-h-0">
              <h3 className="text-sm font-bold text-primary mb-2">Appointment Details</h3>
              <div className="grid grid-cols-2 gap-2 gap-x-4 mb-2">
                <div className="flex items-start gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground leading-tight">Service</p>
                    <p className="text-xs font-medium truncate">{data.situation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground leading-tight">Location</p>
                    <p className="text-xs font-medium truncate" title={data.location.name}>{data.location.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground leading-tight">Date</p>
                    <p className="text-xs font-medium truncate">{data.selectedDay}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground leading-tight">Time</p>
                    <p className="text-xs font-medium truncate">{data.selectedTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5 col-span-2">
                  <Shield className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground leading-tight">Insurance</p>
                    <p className="text-xs font-medium truncate">{data.insurance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t mt-auto">
            <p className="text-[10px] text-muted-foreground truncate mr-2">
              Confirmation sent to {data.patientPhone}
            </p>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="h-7 text-[10px] px-2"
            >
              ← Back to Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
