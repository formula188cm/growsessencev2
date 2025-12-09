const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxXjEkrObDRzUN3Cm31fAbzmT6P9dpbcbXrN6VccVVXaepimrs2ynUhk5bJzVMm-_JPVw/exec"

// Referral sheet App Script URL - REPLACE THIS WITH YOUR ACTUAL REFERRAL SHEET APP SCRIPT URL
const REFERRAL_SHEET_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwcCcsxJpa0LnV0j84gnd-hXmZetKXuhCU2Lm58uCQ99ACP9R_oIEAmnu6UPyBkq-Gt/exec"

interface CheckoutData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pinCode: string
  referralCode?: string
  paymentMethod: "online" | "cod"
  quantity: number
  totalPrice: number
}

// Generate a unique order ID
export function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

// Submit checkout data to Google Sheets
export async function submitToGoogleSheets(data: CheckoutData, orderId: string, sheetName = "Sheet1") {
  try {
    const payloadData = {
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pinCode,
      landmark: "",
      quantity: data.quantity,
      total: data.totalPrice,
      timestamp: new Date().toLocaleString("en-IN"),
      orderStatus: "Confirmed",
      paymentMethod: data.paymentMethod,
      orderId: orderId,
      beneficiaryName: data.firstName,
      paymentTimestamp: new Date().toLocaleString("en-IN"),
      referralCode: data.referralCode?.toUpperCase() || "",
    }

    const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=${sheetName}`, {
      method: "POST",
      body: JSON.stringify(payloadData),
      mode: "no-cors",
    })

    return {
      success: true,
      message: "Order data submitted successfully",
    }
  } catch (error) {
    console.error("Google Sheets submission error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit order",
    }
  }
}

// Submit checkout data to Referral Google Sheet (different structure)
export async function submitToReferralSheet(data: CheckoutData, orderId: string) {
  try {
    // Combine address fields into full address
    const fullAddress = `${data.address}, ${data.city}, ${data.state} ${data.pinCode}`

    const payloadData = {
      id: orderId,
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      address: fullAddress,
      price: data.totalPrice,
      referralCode: data.referralCode?.toUpperCase() || "",
      status: "Confirmed",
    }

    const response = await fetch(REFERRAL_SHEET_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payloadData),
      mode: "no-cors",
    })

    return {
      success: true,
      message: "Order data submitted successfully to referral sheet",
    }
  } catch (error) {
    console.error("Referral Google Sheets submission error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit order to referral sheet",
    }
  }
}
