import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isDesktopPointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/** Splits a string into word/char spans for staggered reveals. */
export function splitToChars(text: string) {
  return text.split('')
}

export const ease = {
  out: 'power3.out',
  inOut: 'power3.inOut',
  expo: 'expo.out',
} as const
