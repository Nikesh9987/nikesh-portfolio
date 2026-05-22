import type { Metadata, Viewport } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow    from "@/components/ui/CursorGlow";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://nikeshmandal.dev"),
  title: {
    default:  "Nikesh Mandal — Full Stack Developer & Freelance Software Engineer",
    template: "%s | Nikesh Mandal",
  },
  description:
    "Full Stack Developer specializing in Java, Python, Spring Boot, React & REST APIs. " +
    "Available for freelance projects worldwide.",
  authors:  [{ name: "Nikesh Mandal" }],
  creator:  "Nikesh Mandal",
  robots:   { index: true, follow: true },
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         "https://nikeshmandal.dev",
    siteName:    "Nikesh Mandal Portfolio",
    title:       "Nikesh Mandal — Full Stack Developer",
    description: "Building scalable software with Java, Python, Spring Boot & React.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card:   "summary_large_image",
    title:  "Nikesh Mandal — Full Stack Developer",
    images: ["/og-image.png"],
  },
  icons: {
    icon:     "/favicon.ico",
    apple:    "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
};

export const viewport: Viewport = {
  themeColor:   "#020409",
  colorScheme:  "dark",
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-cyber-black antialiased">
        <div
          id="scroll-progress"
          role="progressbar"
          aria-label="Page scroll progress"
        />
        <CursorGlow />
        <ScrollProgress />
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}