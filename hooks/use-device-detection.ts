"use client"

import { useState, useEffect } from "react"

type DeviceType = "android" | "ios" | "desktop" | "unknown"

export function useDeviceDetection() {
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const userAgent = window.navigator.userAgent.toLowerCase()

    // Detect iOS devices (iPhone, iPad, iPod)
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType("ios")
    }
    // Detect Android devices
    else if (/android/.test(userAgent)) {
      setDeviceType("android")
    }
    // Assume desktop for all other cases
    else {
      setDeviceType("desktop")
    }
  }, [])

  const getDownloadLink = () => {
    // Only return links if we're on the client side
    if (!isClient) return "#"

    switch (deviceType) {
      case "android":
        return "https://play.google.com/store/apps/details?id=io.pure.crypto.android.app"
      case "ios":
        return "https://apps.apple.com/cy/app/purewallet/id1607431631"
      default:
        // For desktop, we could either return a default store or a page with both options
        return "#download-options"
    }
  }

  return {
    deviceType,
    isClient,
    getDownloadLink,
    isAndroid: deviceType === "android",
    isIOS: deviceType === "ios",
    isMobile: deviceType === "android" || deviceType === "ios",
    isDesktop: deviceType === "desktop",
  }
}
