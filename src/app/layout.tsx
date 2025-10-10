import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Mood Journal",
   description: "journal to analyze your mood with AI.",
};

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <ClerkProvider>
         <html lang="en" className={`scroll-smooth ${inter.className}`}>
            <body
               className={`min-h-screen bg-gradient-to-b from-brand-dark
                via-brand-purple to-brand-blue text-white`}>
               {children}
            </body>
         </html>
      </ClerkProvider>
   );
}
