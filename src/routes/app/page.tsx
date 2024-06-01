import LoadingIndicator from "@/components/LoadingIndicator";
import SyncUserData from "@/components/SyncUserData";
import { auth } from "@/lib/firebase";
import ChannelsProvider from "@/providers/ChannelsProvider";
import CommunitiesProvider from "@/providers/CommunitiesProvider";
import MessageStatsProvider from "@/providers/MessageStatsProvider";
import { useAuth } from "@clerk/clerk-react";
import { signInWithCustomToken } from "firebase/auth";
import { useEffect, useState } from "react";
import CommunityList from "./CommunityList";
import ChannelList from "./ChannelList";
import Messaging from "./Messaging";

export type ActivePage = "communities" | "channels" | "messaging"

export default function AppPage() {
  const { getToken } = useAuth()
  const [activePage, setActivePage] = useState<ActivePage>("communities")
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
          <main className="bg-[url(/chat-background.jpeg)] bg-cover bg-center grid grid-cols-1 sm:grid-cols-2">
            <div className={`bg-white relative row-start-1 col-start-1 ${activePage == "communities" && "z-10"}`}>
              <CommunityList openCommunity={() => setActivePage("channels")} />
            </div>
            <div className={`bg-white relative row-start-1 col-start-1 ${activePage == "channels" && "z-10"}`}>
              <ChannelList openMessaging={() => setActivePage("messaging")} back={() => setActivePage("communities")} />
            </div>
            <div className={`bg-[url(/chat-background.jpeg)] relative row-start-1 col-start-1 sm:col-start-2 ${activePage == "messaging" && "z-10"}`}>
              <Messaging back={() => setActivePage("channels")} />
            </div>
          </main>
        </MessageStatsProvider>
      </ChannelsProvider>
    </CommunitiesProvider>
  )
}
