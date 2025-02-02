import { ThemeSwitcher } from "@/components/theme-switcher";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/dashboard/loader";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://hidden-vampire-97vp4rjj69xcxvw4-3000.app";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Easy Review Widget for Your Website | RaveBoard",
  description:
    "Showcase your best customer reviews in minutes with RaveBoard. Our easy-to-use widget requires no coding and works on any website. Start building trust and driving sales today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
      </body>
    </html>
  );
}
