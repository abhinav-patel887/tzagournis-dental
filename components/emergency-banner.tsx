"use client"

import { Phone } from "lucide-react"

export function EmergencyBanner() {
  return (
    <div className="bg-destructive text-destructive-foreground py-2 px-4 text-center text-sm font-medium">
      <a 
        href="tel:6148824032" 
        className="flex items-center justify-center gap-2 hover:underline"
      >
        <Phone className="h-4 w-4" />
        <span>Dental emergency? Call now: (614) 882-4032</span>
      </a>
    </div>
  )
}
