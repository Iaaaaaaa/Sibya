"use client";

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import GuestSide from "@/components/layout/GuestSide";
import MainContent from "@/components/layout/MainContent";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const GuestPage: React.FC = () => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <GuestSide />
          <main></main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default GuestPage;
