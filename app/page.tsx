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

export default function Home() {
  return (
    <main className="min-h-screen">
      <EmergencyBanner />
      <Navbar />
      <HeroSection />
      <StatsBar />
      <DoctorsSection />
      <CERECSection />
      <ServicesSection />
      <ServicesScroller />
      <ReviewsSection />
      <SmilePlanSection />
      <LocationsSection />
      <Footer />
    </main>
  )
}
