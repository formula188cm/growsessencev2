"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

const REFERRAL_CODE_KEY = "referralCode"
const COOKIE_MAX_AGE_DAYS = 30

/**
 * Get referral code from localStorage (client-side only)
 */
function getStoredReferralCode(): string | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(REFERRAL_CODE_KEY)
    return stored ? stored.trim() : null
  } catch {
    return null
  }
}

/**
 * Get referral code from cookie (client-side only)
 */
function getCookieReferralCode(): string | null {
  if (typeof document === "undefined") return null
  try {
    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=")
      if (name === REFERRAL_CODE_KEY && value) {
        return value.trim() || null
      }
    }
  } catch {
    // Ignore cookie errors
  }
  return null
}

/**
 * Save referral code to localStorage and cookie
 */
function saveReferralCode(code: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") return
  
  try {
    // Save to localStorage
    localStorage.setItem(REFERRAL_CODE_KEY, code)
    
    // Save to cookie (30 days)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + COOKIE_MAX_AGE_DAYS)
    document.cookie = `${REFERRAL_CODE_KEY}=${code}; path=/; expires=${expiryDate.toUTCString()}`
  } catch {
    // Ignore storage errors
  }
}

/**
 * Hook to manage referral code from URL parameter, localStorage, and cookie
 * @returns referral code string or null
 */
export function useReferralCode(): string | null {
  const searchParams = useSearchParams()
  
  // Initialize from localStorage immediately (client-side only)
  const [referralCode, setReferralCode] = useState<string | null>(() => {
    if (typeof window === "undefined") return null
    return getStoredReferralCode() || getCookieReferralCode()
  })

  useEffect(() => {
    // Check URL parameter first
    const urlRef = searchParams.get("ref")
    
    if (urlRef) {
      // Uppercase and save the code from URL
      const code = urlRef.toUpperCase().trim()
      if (code) {
        saveReferralCode(code)
        setReferralCode(code)
        return
      }
    }

    // If no URL param, try to load from localStorage
    const storedCode = getStoredReferralCode()
    if (storedCode) {
      setReferralCode(storedCode)
      return
    }

    // Try to load from cookie as fallback
    const cookieCode = getCookieReferralCode()
    if (cookieCode) {
      // Sync to localStorage
      try {
        localStorage.setItem(REFERRAL_CODE_KEY, cookieCode)
      } catch {
        // Ignore
      }
      setReferralCode(cookieCode)
      return
    }

    // No referral code found
    setReferralCode(null)
  }, [searchParams])

  return referralCode
}

