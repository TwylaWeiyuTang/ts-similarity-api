import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toast";
import Background from "@/components/Background";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Similarity API ",
  description: "Free & open-source text similarity API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        <Providers>
          {children}
          <Toaster position="bottom-right" />
          {/* ts-expect-error Server Component */}
          <Navbar />
          <Background />
        </Providers>

        {/* allow more height on  mobile devices */}
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
