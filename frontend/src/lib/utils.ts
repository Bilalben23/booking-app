import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const placeSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  pricePerNight: z.number(),
  images: z.array(z.string().url()),
  hostId: z.object({
    _id: z.string(),
    name: z.string()
  }),
  checkIn: z.string(),
  checkOut: z.string(),
  maxGuests: z.number(),
  perks: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number()
})
