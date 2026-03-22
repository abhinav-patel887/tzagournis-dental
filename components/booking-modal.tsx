"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { LocationId, BookingData, FamilyMember } from "@/types/booking"

interface BookingModalProps {
  isOpen: boolean
  preSelectedLocation: LocationId | null
  onClose: () => void
  onComplete: (data: BookingData) => void
}

const SITUATIONS = [
  { id: "checkup",   label: "Checkup & Cleaning",   emoji: "🪥" },
  { id: "braces",    label: "Braces & Aligners",     emoji: "😬" },
  { id: "veneers",   label: "Veneers & Whitening",   emoji: "✨" },
  { id: "implants",  label: "Implants & Dentures",   emoji: "🦷" },
  { id: "crowns",    label: "Crowns & Fillings",     emoji: "👑" },
  { id: "childcare", label: "Child's Dental Care",   emoji: "🧒" },
  { id: "nervous",   label: "I'm Nervous",           emoji: "😰", variant: "anxiety" },
  { id: "emergency", label: "Dental Emergency",      emoji: "🚨", variant: "emergency" },
  { id: "other",     label: "Other",                 emoji: "❓" },
]

const LOCATION_DATA = {
  westerville: {
    id: "westerville" as LocationId,
    name: "Westerville",
    phone: "(614) 882-4032",
    address: "385 County Line Rd W Suite 100, Westerville, OH 43082",
    hours: "Mon–Fri available",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    slots: {
      Monday:    ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
      Tuesday:   ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
      Wednesday: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
      Thursday:  ["7:00 AM", "9:00 AM",  "11:00 AM", "1:00 PM", "3:00 PM"],
      Friday:    ["7:00 AM", "9:00 AM",  "11:00 AM"],
    },
  },
  upperarlington: {
    id: "upperarlington" as LocationId,
    name: "Upper Arlington",
    phone: "(614) 457-1481",
    address: "5025 Arlington Centre Blvd #220, Upper Arlington, OH",
    hours: "Mon–Thu available",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    slots: {
      Monday:    ["7:30 AM", "9:30 AM",  "11:30 AM", "1:30 PM", "3:30 PM"],
      Tuesday:   ["7:30 AM", "9:30 AM",  "11:30 AM", "1:30 PM", "3:30 PM"],
      Wednesday: ["7:30 AM", "9:30 AM",  "11:30 AM", "1:30 PM", "3:30 PM"],
      Thursday:  ["7:00 AM", "9:00 AM",  "11:00 AM", "1:00 PM", "3:00 PM"],
    },
  },
}

const INSURANCE_OPTIONS = [
  { id: "has-insurance",  emoji: "✅", label: "Yes, I have dental insurance",      desc: "Bring your card — we'll verify everything at the office.", highlight: false },
  { id: "smile-plan",     emoji: "🌟", label: "Smile Plan — no insurance needed",  desc: "Affordable membership. Cleanings included + discounts on all treatments.", highlight: true },
  { id: "out-of-pocket",  emoji: "💵", label: "I'll pay out of pocket",            desc: "We'll give you an exact quote before any work begins.", highlight: false },
  { id: "not-sure",       emoji: "🤷", label: "I'm not sure",                      desc: "Bring any cards you have — we'll sort it out together.", highlight: false },
]

function isSlotTaken(idx: number) {
  return idx % 3 === 2
}

export function BookingModal({ isOpen, preSelectedLocation, onClose, onComplete }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [subFlow, setSubFlow] = useState<"none" | "anxiety" | "emergency">("none")
  const [situation, setSituation] = useState<string | null>(null)
  const [location, setLocation] = useState<LocationId | null>(null)
  const [selectedDay, setSelectedDay] = useState<string>("Monday")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [insurance, setInsurance] = useState<string | null>(null)
  const [patientName, setPatientName] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFamilyAdd, setShowFamilyAdd] = useState(false)
  const [familyName, setFamilyName] = useState("")
  const [familyService, setFamilyService] = useState("Checkup & Cleaning")

  // Reset ALL state every time modal opens — this is the key fix
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setSubFlow("none")
      setSituation(null)
      setLocation(preSelectedLocation)
      setSelectedDay("Monday")
      setSelectedTime(null)
      setInsurance(null)
      setPatientName("")
      setPatientPhone("")
      setFamilyMembers([])
      setShowFamilyAdd(false)
      setFamilyName("")
      setFamilyService("Checkup & Cleaning")
      setIsLoading(false)
    }
  }, [isOpen, preSelectedLocation])

  if (!isOpen) return null

  const currentLocationData = location ? LOCATION_DATA[location] : null
  const slots = currentLocationData
    ? (currentLocationData.slots as Record<string, string[]>)[selectedDay] ?? []
    : []

  const handleSituationSelect = (s: typeof SITUATIONS[0]) => {
    setSituation(s.id)
    if (s.variant === "emergency") {
      setTimeout(() => setSubFlow("emergency"), 150)
    } else if (s.variant === "anxiety") {
      setTimeout(() => setSubFlow("anxiety"), 150)
    } else {
      setTimeout(() => setStep(2), 300)
    }
  }

  const handleLocationSelect = (locId: LocationId) => {
    setLocation(locId)
    setSelectedDay("Monday")
    setSelectedTime(null)
  }

  const handleDaySelect = (day: string) => {
    setSelectedDay(day)
    setSelectedTime(null)
  }

  const handleAddFamilyMember = () => {
    if (!familyName.trim()) return
    setFamilyMembers(prev => [...prev, { name: familyName.trim(), service: familyService, time: "Next available" }])
    setFamilyName("")
    setShowFamilyAdd(false)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const loc = LOCATION_DATA[location ?? "westerville"]
    onComplete({
      situation: SITUATIONS.find(s => s.id === situation)?.label ?? situation ?? "",
      isAnxious: subFlow === "anxiety",
      isEmergency: subFlow === "emergency",
      location: { id: loc.id, name: loc.name, address: loc.address, phone: loc.phone },
      selectedDay,
      selectedTime: selectedTime ?? "",
      insurance: INSURANCE_OPTIONS.find(i => i.id === insurance)?.label ?? insurance ?? "",
      patientName,
      patientPhone,
      familyMembers,
    })
    setIsLoading(false)
  }

  // ─── EMERGENCY FAST-TRACK ───────────────────────────────────────
  if (subFlow === "emergency") {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="bg-background rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md relative p-6 sm:p-8">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
          <div className="space-y-5">
            <div className="text-center">
              <div className="text-5xl mb-3">🚨</div>
              <h2 className="text-2xl font-bold text-destructive">We're Here for You</h2>
              <p className="text-muted-foreground text-sm mt-2">Dental pain can't wait. Call us now and we'll see you today.</p>
            </div>
            <a href="tel:6148824032" className="block">
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
                📞 Call (614) 882-4032 — Westerville
              </Button>
            </a>
            <a href="tel:6144571481" className="block">
              <Button size="lg" variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                📞 Call (614) 457-1481 — Upper Arlington
              </Button>
            </a>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <div className="flex-1 h-px bg-border" /><span>or</span><div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium">Can't call right now? Leave your number.</p>
              <Input placeholder="Your first name" style={{ fontSize: "16px" }} />
              <Input type="tel" placeholder="(614) 000-0000" style={{ fontSize: "16px" }} />
              <Button className="w-full">Call me back within 15 minutes</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── MAIN MODAL ─────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className={`relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto ${subFlow === "anxiety" ? "bg-blue-50" : "bg-background"}`}>

        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 hover:bg-black/10 rounded-lg transition-colors">
          <X className="h-5 w-5" />
        </button>

        {/* Progress bar — hidden during anxiety sub-flow */}
        {subFlow === "none" && (
          <div className="px-6 pt-6 pb-0">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all ${
                    step > s ? "bg-primary text-primary-foreground" :
                    step === s ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {step > s ? <Check className="h-3.5 w-3.5" /> : s}
                  </div>
                  {i < 3 && <div className={`flex-1 h-0.5 mx-1 rounded-full transition-all ${step > s ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1 px-0">
              {["Visit type", "Location & time", "Insurance", "Your details"].map((label, i) => (
                <span key={label} className={`text-[10px] ${step === i + 1 ? "text-primary font-medium" : "text-muted-foreground"}`}
                  style={{ width: i === 0 ? "55px" : i === 1 ? "70px" : i === 2 ? "55px" : "60px", textAlign: i === 3 ? "right" : i === 1 ? "center" : "left" }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="p-6">

          {/* ── ANXIETY SUB-FLOW ── */}
          {subFlow === "anxiety" && (
            <div className="flex flex-col items-center text-center gap-5 py-2">
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dJCL8txhGe6nOUbKeAevC3DtRgaT3w.png"
                  alt="Dr. George Tzagournis" width={80} height={80}
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-800">Dr. George Tzagournis</p>
                <p className="text-xs text-blue-600">Founder & Lead Dentist</p>
              </div>
              <div className="space-y-3 max-w-sm">
                <h3 className="text-xl font-bold text-blue-900">You're not alone.</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Most of our patients felt the same way before their first visit. Dr. Tzagournis always takes extra time to explain every step before doing anything.
                </p>
                <p className="text-blue-800 text-sm leading-relaxed">
                  <strong>You are in complete control</strong> — you can pause, ask questions, or stop at any time. We go at your pace.
                </p>
              </div>
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => { setSubFlow("none"); setStep(2) }}>
                I'm Ready — Let's Book My Appointment →
              </Button>
            </div>
          )}

          {/* ── STEP 1: Situation ── */}
          {subFlow === "none" && step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-1">What brings you in today?</h2>
              <p className="text-sm text-muted-foreground mb-5">Select the option that best describes your visit</p>
              <div className="grid grid-cols-3 gap-2.5">
                {SITUATIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleSituationSelect(s)}
                    className={`relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 min-h-[80px] text-center transition-all duration-150
                      ${situation === s.id
                        ? "border-primary bg-primary/10"
                        : s.variant === "anxiety"
                          ? "border-blue-300 bg-blue-50 hover:border-blue-500"
                          : s.variant === "emergency"
                            ? "border-red-300 bg-red-50 hover:border-red-500"
                            : "border-border hover:border-primary/60 hover:bg-primary/5"
                      }`}
                  >
                    {situation === s.id && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                    <span className="text-3xl leading-none">{s.emoji}</span>
                    <span className={`text-[11px] font-semibold leading-tight ${
                      s.variant === "anxiety" ? "text-blue-800" :
                      s.variant === "emergency" ? "text-red-800" :
                      "text-foreground"
                    }`}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Location + Time ── */}
          {subFlow === "none" && step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold mb-1">Choose your location & time</h2>
                <p className="text-sm text-muted-foreground">Select where you'd like to be seen</p>
              </div>

              {/* Location cards — always shown, pre-selected one is greyed */}
              <div className="grid grid-cols-2 gap-3">
                {(Object.values(LOCATION_DATA) as typeof LOCATION_DATA[keyof typeof LOCATION_DATA][]).map(loc => {
                  const isSelected = location === loc.id
                  const isLocked = preSelectedLocation !== null
                  return (
                    <button
                      key={loc.id}
                      onClick={() => !isLocked && handleLocationSelect(loc.id)}
                      disabled={isLocked}
                      className={`relative p-3 rounded-xl border-2 text-left transition-all duration-150
                        ${isSelected ? "border-primary bg-primary/10" : "border-border bg-background"}
                        ${isLocked 
                          ? (isSelected ? "cursor-default" : "opacity-40 grayscale cursor-not-allowed") 
                          : "hover:border-primary/50 cursor-pointer"}
                      `}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                      <MapPin className="h-4 w-4 text-primary mb-1" />
                      <p className="text-sm font-semibold text-foreground">{loc.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{loc.hours}</p>
                    </button>
                  )
                })}
              </div>

              {/* Day + Time — shown when location is selected */}
              {location && currentLocationData && (
                <>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Select a day</p>
                    <div className="flex gap-2 flex-wrap">
                      {currentLocationData.days.map(day => (
                        <button
                          key={day}
                          onClick={() => handleDaySelect(day)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            selectedDay === day
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Select a time</p>
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map((slot, idx) => {
                        const taken = isSlotTaken(idx)
                        const isSelected = selectedTime === slot
                        return (
                          <button
                            key={slot}
                            disabled={taken}
                            onClick={() => !taken && setSelectedTime(slot)}
                            className={`py-2.5 rounded-lg text-sm font-medium border transition-all min-h-[44px] ${
                              taken
                                ? "bg-muted text-muted-foreground line-through cursor-not-allowed border-border/50 opacity-50"
                                : isSelected
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "border-border hover:border-primary/50 hover:bg-primary/5"
                            }`}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Family member add-on */}
                  {selectedTime && (
                    <div className="pt-2 border-t border-border">
                      {familyMembers.length === 0 && !showFamilyAdd ? (
                        <button onClick={() => setShowFamilyAdd(true)} className="text-sm text-primary hover:underline flex items-center gap-1.5">
                          <span>+</span> Adding a family member? (optional)
                        </button>
                      ) : null}

                      {familyMembers.map((m, i) => (
                        <div key={i} className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2 mb-2 text-sm">
                          <span>{m.name} — {m.service}</span>
                          <button onClick={() => setFamilyMembers(prev => prev.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive ml-2">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

                      {showFamilyAdd && familyMembers.length < 2 && (
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Family member's name"
                            value={familyName}
                            onChange={e => setFamilyName(e.target.value)}
                            style={{ fontSize: "16px" }}
                            className="flex-1"
                          />
                          <select
                            value={familyService}
                            onChange={e => setFamilyService(e.target.value)}
                            className="border border-border rounded-md px-2 text-sm bg-background text-foreground"
                          >
                            {SITUATIONS.filter(s => !s.variant).map(s => (
                              <option key={s.id}>{s.label}</option>
                            ))}
                          </select>
                          <Button size="sm" disabled={!familyName.trim()} onClick={handleAddFamilyMember}>Add</Button>
                        </div>
                      )}

                      {familyMembers.length > 0 && familyMembers.length < 2 && !showFamilyAdd && (
                        <button onClick={() => setShowFamilyAdd(true)} className="text-sm text-primary hover:underline mt-1">+ Add another</button>
                      )}
                    </div>
                  )}
                </>
              )}

              <Button
                className="w-full"
                disabled={!location || !selectedTime}
                onClick={() => setStep(3)}
              >
                Continue →
              </Button>
            </div>
          )}

          {/* ── STEP 3: Insurance ── */}
          {subFlow === "none" && step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-1">One quick question about insurance</h2>
                <p className="text-sm text-muted-foreground">Select what applies to you</p>
              </div>
              <div className="space-y-2.5">
                {INSURANCE_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setInsurance(opt.id); setTimeout(() => setStep(4), 300) }}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                      insurance === opt.id
                        ? "border-primary bg-primary/10"
                        : opt.highlight
                          ? "border-primary/40 bg-primary/5 hover:border-primary"
                          : "border-border hover:border-primary/50 hover:bg-muted/30"
                    }`}
                  >
                    <span className="text-xl mt-0.5">{opt.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 4: Details ── */}
          {subFlow === "none" && step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold mb-1">Almost done!</h2>
                <p className="text-sm text-muted-foreground">Just your details to confirm your appointment.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">First name</label>
                  <Input
                    placeholder="Your first name"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Phone number</label>
                  <Input
                    type="tel"
                    placeholder="(614) 000-0000"
                    value={patientPhone}
                    onChange={e => setPatientPhone(e.target.value)}
                    style={{ fontSize: "16px" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  We'll text you a confirmation instantly. No spam, ever.
                </p>
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!patientName.trim() || !patientPhone.trim() || isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Confirming...
                    </span>
                  ) : "Confirm My Appointment →"}
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
