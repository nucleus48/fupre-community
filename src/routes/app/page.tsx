import LoadingIndicator from "@/components/LoadingIndicator";
import SyncUserData from "@/components/SyncUserData";
import { auth } from "@/lib/firebase";
import ChannelsProvider from "@/providers/ChannelsProvider";
import CommunitiesProvider from "@/providers/CommunitiesProvider";
import MessageStatsProvider from "@/providers/MessageStatsProvider";
import { useAuth } from "@clerk/clerk-react";
import { signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";

export default function AppPage() {
  const { getToken } = useAuth()
  const [authSynced, setAuthSynced] = useState(false)

  useEffect(() => {
    getToken({ template: "integration_firebase" })
      .then(token => signInWithCustomToken(auth, token!))
      .then(() => setAuthSynced(true))
  }, [])

  if (!authSynced) return <LoadingIndicator />

  return (
    <CommunitiesProvider>
      <ChannelsProvider>
        <MessageStatsProvider>
          <SyncUserData />
          <main>
            <div>
            </div>
          </main>
        </MessageStatsProvider>
      </ChannelsProvider>
    </CommunitiesProvider>
  )
}
