import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import "./highlightjs.css";
import { cn } from "@/lib/utils";
import { DirectionProvider } from "@/components/ui/direction";
import { HeroHeader } from "../components/header";
import { ThemeProvider } from "@/components/theme-provider";
import FooterSection from "@/components/footer";

const vazirmatn = Vazirmatn({ variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "codepedia",
  description: "codepedia blog",
  metadataBase: new URL("https://www.codepedia.top"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      suppressHydrationWarning
      dir="rtl"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        vazirmatn.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DirectionProvider direction="rtl" dir="rtl">
            <HeroHeader />
            <div className="relative">
              <main className="relative z-10 min-h-screen bg-background">
                {children}
              </main>
            </div>
            <FooterSection />
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
