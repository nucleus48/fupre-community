import { ClerkProvider } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function RootLayout() {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/signin"
      signUpUrl="/signup"
      afterSignOutUrl="/signin"
      signInFallbackRedirectUrl="/app"
      signUpFallbackRedirectUrl="/app"
      appearance={{
        layout: {
          logoLinkUrl: "/",
          logoImageUrl: "/logo.jpeg"
        }
      }}
    >
      <Outlet />
    </ClerkProvider>
  )
}
