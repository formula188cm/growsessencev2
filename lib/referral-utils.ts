/**
 * Get referral code from localStorage (client-side only)
 * Use this utility to preserve referral codes in links
 */
export function getReferralCode(): string | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem("referralCode")
    return stored ? stored.trim() : null
  } catch {
    return null
  }
}

/**
 * Build checkout URL with referral code preserved
 */
export function getCheckoutUrl(quantity: number = 1): string {
  const referralCode = getReferralCode()
  const baseUrl = `/checkout?quantity=${quantity}`
  
  if (referralCode) {
    return `${baseUrl}&ref=${encodeURIComponent(referralCode)}`
  }
  
  return baseUrl
}

