import LoadingIndicator from "@/components/LoadingIndicator";
import { Channel } from "@/types";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useCommunities } from "./CommunitiesProvider";
import { onSnapshot } from "firebase/firestore";
import { firebaseRefs } from "@/lib/firebase";
import arrayConcate from "@/lib/utils/arrayConcate";

export type Channels = (Channel & { communityId: string })[]

export type ChannelsContextValue = {
  activeChannel?: Channel,
  setActiveChannel: (channel: Channel) => void,
  channels: Channels
}

export const ChannelsContext = createContext<ChannelsContextValue | null>(null)

export default function ChannelsProvider({ children }: PropsWithChildren) {
  const [channels, setChannels] = useState<Channels>()
  const [activeChannel, setActiveChannel] = useState<Channel>()
  const { communities: [communities] } = useCommunities()

  useEffect(() => {
    if (!communities.length) return setChannels([])
    const unsubscribers = communities.map(({ id: communityId }) => onSnapshot(firebaseRefs.channels(communityId), snapshot => {
      const channels = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, communityId }))
      setChannels(prev => {
        if (!prev) return channels
        return arrayConcate(channels, prev, "id")
      })
    }))
    return () => unsubscribers.forEach(unsubscribe => unsubscribe())
  }, [communities])

  if (!channels) return <LoadingIndicator />

  return (
    <ChannelsContext.Provider value={{ activeChannel, setActiveChannel, channels }}>
      {children}
    </ChannelsContext.Provider>
  )
}

export function useChannels() {
  return useContext(ChannelsContext)!
}
