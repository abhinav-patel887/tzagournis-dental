export type LocationId = "westerville" | "upperarlington"

export interface FamilyMember {
  name: string
  service: string
  time: string
}

export interface BookingData {
  situation: string
  isAnxious: boolean
  isEmergency: boolean
  location: {
    id: LocationId
    name: string
    address: string
    phone: string
  }
  selectedDay: string
  selectedTime: string
  insurance: string
  patientName: string
  patientPhone: string
  familyMembers: FamilyMember[]
}
