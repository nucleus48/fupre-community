import LoadingIndicator from "@/components/LoadingIndicator";
import SyncUserData from "@/components/SyncUserData";
import { auth } from "@/lib/firebase";
import { useAuth } from "@clerk/clerk-react";
import { signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { getToken } = useAuth()
  const [authSynced, setAuthSynced] = useState(false)

  useEffect(() => {
    getToken({ template: "integration_firebase" })
      .then(token => signInWithCustomToken(auth, token!))
      .then(() => setAuthSynced(true))
  }, [])

  if (!authSynced) return <LoadingIndicator />

  return (
    <>
      <SyncUserData />
      <Outlet />
    </>
  )
}
