"use client"

import { useState } from "react"
import { EmergencyBanner } from "@/components/emergency-banner"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { DoctorsSection } from "@/components/doctors-section"
import { CERECSection } from "@/components/cerec-section"
import { ServicesSection } from "@/components/services-section"
import { ServicesScroller } from "@/components/services-scroller"
import { ReviewsSection } from "@/components/reviews-section"
import { SmilePlanSection } from "@/components/smile-plan-section"
import { LocationsSection } from "@/components/locations-section"
import { Footer } from "@/components/footer"
import { BookingModal } from "@/components/booking-modal"
import { BookingSuccess } from "@/components/booking-success"
import type { LocationId, BookingData } from "@/types/booking"

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [preSelectedLocation, setPreSelectedLocation] = useState<LocationId | null>(null)
  const [bookingData, setBookingData] = useState<BookingData | null>(null)

  const handleOpenBooking = (location: LocationId | null) => {
    setPreSelectedLocation(location)
    setIsBookingOpen(true)
  }

  const handleCompleteBooking = (data: BookingData) => {
    setBookingData(data)
    setIsBookingOpen(false)
    setShowSuccess(true)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    setBookingData(null)
  }

  return (
    <main className="min-h-screen">
      <EmergencyBanner />
      <Navbar onBook={handleOpenBooking} />
      <HeroSection onBook={handleOpenBooking} />
      <StatsBar />
      <DoctorsSection />
      <CERECSection />
      <ServicesSection />
      <ServicesScroller />
      <ReviewsSection />
      <SmilePlanSection />
      <LocationsSection onBook={handleOpenBooking} />
      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        preSelectedLocation={preSelectedLocation}
        onClose={() => setIsBookingOpen(false)}
        onComplete={handleCompleteBooking}
      />

      <BookingSuccess
        isOpen={showSuccess}
        data={bookingData}
        onClose={handleCloseSuccess}
      />
    </main>
  )
}
