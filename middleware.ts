import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/api/webhooks",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
]);

export default clerkMiddleware((auth, req) => {
  console.log("Request URL:", req.nextUrl.pathname);

  if (isPublicRoute(req)) {
    console.log("Public route accessed:", req.nextUrl.pathname);
    return; // Allow access to public routes
  }

  console.log("Protected route accessed:", req.nextUrl.pathname);
  auth.protect(); // Protect non-public routes
});

export const config = {
  matcher: ["/api/webhooks", "/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
