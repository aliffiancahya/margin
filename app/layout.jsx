import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", title: site.title, description: site.description, siteName: site.name },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#main-content" className="sr-only rounded-lg bg-ink px-5 py-3 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50">Skip to content</a>
        <Navbar />
        <main id="main-content" className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
