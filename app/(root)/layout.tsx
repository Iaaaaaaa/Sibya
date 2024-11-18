"use client";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Side from "@/components/layout/Side";
import MainContent from "@/components/layout/MainContent";
import Footer from "@/components/layout/Footer";
import "../globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </body>
      </html>
      <SignedIn>
        <html lang="en">
          <body>
            <Header />
            <Side />
            <main>{children}</main>
            <Footer />
          </body>
        </html>
      </SignedIn>
    </ClerkProvider>
  );
}
