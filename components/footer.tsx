"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Locations", href: "#locations" },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="font-semibold text-lg">Tzagournis Dental</span>
            </div>
            <p className="text-background/70 text-sm">
              Columbus&apos;s most trusted dental group providing quality care for families since 1985.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Westerville */}
          <div className="space-y-4">
            <h4 className="font-semibold">Westerville</h4>
            <div className="space-y-2 text-sm text-background/70">
              <p>385 County Line Rd W Suite 100</p>
              <p>Westerville, OH</p>
              <p className="pt-1">
                <Link href="tel:6148824032" className="hover:text-background transition-colors">
                  (614) 882-4032
                </Link>
              </p>
              <p>Mon-Thu: 8am–5pm</p>
              <p>Fri: 7am–1pm</p>
            </div>
          </div>

          {/* Upper Arlington */}
          <div className="space-y-4">
            <h4 className="font-semibold">Upper Arlington</h4>
            <div className="space-y-2 text-sm text-background/70">
              <p>5025 Arlington Centre Blvd #220</p>
              <p>Upper Arlington, OH</p>
              <p className="pt-1">
                <Link href="tel:6144571481" className="hover:text-background transition-colors">
                  (614) 457-1481
                </Link>
              </p>
              <p>Mon-Wed: 7:30am–4pm</p>
              <p>Thu: 7am–5pm</p>
            </div>
          </div>
        </div>

        {/* ADA Badge */}
        <div className="flex items-center justify-center py-8 border-t border-background/10 mt-12">
          <div className="flex items-center gap-3 text-background/70 text-sm">
            <div className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center">
              <span className="font-bold text-xs">ADA</span>
            </div>
            <span>American Dental Association Member</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              © 2025 Tzagournis Dental Group. All rights reserved.
            </p>
            <div className="flex flex-col items-center sm:items-end gap-2">
              <div className="flex items-center gap-6 text-sm">
                <Link href="#" className="text-background/60 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-background/40">|</span>
                <span className="text-background/60">
                  Built by{" "}
                  <Link 
                    href="https://orbitly.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-background transition-colors"
                  >
                    Orbitly.ai
                  </Link>
                </span>
              </div>
              <p className="text-xs text-background/40">
                AI Web Services and Automation Agency
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
