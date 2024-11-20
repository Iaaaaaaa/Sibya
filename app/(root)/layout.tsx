import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Header from "@/components/layout/Header";
import Side from "@/components/layout/Side";
import MainContent from "@/components/layout/MainContent";
import RightSide from "@/components/layout/RightSide"; // Import the new right-side layout
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
          <SignedIn>
            <div className="flex flex-col min-h-screen">
              <Header />
              {/* Main Layout Container */}
              <div className="flex flex-1 w-full">
                {/* Sidebar: Fixed width on larger screens */}
                <aside className="hidden w-64 bg-white shadow-md lg:block">
                  <Side />
                </aside>

                {/* Main Content: Takes the remaining space */}
                <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
                  <MainContent>{children}</MainContent>
                </main>

                {/* Right Side Layout */}
                <RightSide />
              </div>
              <Footer />
            </div>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
