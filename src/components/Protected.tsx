import { RedirectToSignIn, useAuth } from "@clerk/clerk-react"
import { PropsWithChildren } from "react"
import { Navigate, useLocation } from "react-router-dom"

export default function Protected(props: PropsWithChildren) {
  const { isSignedIn } = useAuth()
  const { pathname } = useLocation()
  const isProtected = pathname.startsWith("/app")

  if (isSignedIn) {
    if (!isProtected) return <Navigate to="/app" replace />
  }
  else if (isProtected) return <RedirectToSignIn />

  return (
    <>
      {props.children}
    </>
  )
}

