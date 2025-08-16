
import type { Metadata, Viewport } from "next"
import "./globals.css"
import "@coinbase/onchainkit/styles.css"
import { Providers } from "./providers"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "TipFlow",
  description: "Directly tip creators, instantly.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: `${process.env.NEXT_PUBLIC_URL}/og-image.png`,
      button: {
        title: "Launch TipFlow",
        action: {
          type: "launch_frame",
          name: "TipFlow",
          url: process.env.NEXT_PUBLIC_URL,
          splashImageUrl: `${process.env.NEXT_PUBLIC_URL}/splash.png`,
          splashBackgroundColor: "#e0e7ff",
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
