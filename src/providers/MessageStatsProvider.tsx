import { Message } from "@/types";
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useChannels } from "./ChannelsProvider";
import LoadingIndicator from "@/components/LoadingIndicator";
import { limitToLast, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { firebaseRefs } from "@/lib/firebase";
import { useAuth } from "@clerk/clerk-react";

export type MessageStat = {
  channelId: string
  communityId: string
  unreadCount?: number
  lastMessage?: Message
}

export const MessageStatsContext = createContext<MessageStat[]>([])

export default function MessageStatsProvider({ children }: PropsWithChildren) {
  const [messageStats, setMessageStats] = useState<MessageStat[]>()
  const { channels } = useChannels()
  const { userId } = useAuth()
  const setMessageStat = useCallback((messageStat: MessageStat) => setMessageStats(prev => {
    if (!prev) return [messageStat]
    const prevMessageStat = prev.find(value => value.communityId == messageStat.communityId && value.channelId == messageStat.channelId)
    if (prevMessageStat) return [...prev, { ...prevMessageStat, ...messageStat }]
    return [...prev, messageStat]
  }), [])

  useEffect(() => {
    if (!channels.length) return setMessageStats([])
    const unsubscribers = channels.map(({ communityId, id: channelId }) => {
      const unreadCountQuery = query(firebaseRefs.messages(communityId, channelId), where("unreadBy", "array-contains", userId))
      const lastMessageQuery = query(firebaseRefs.messages(communityId, channelId), orderBy("createdAt"), limitToLast(1))
      const unsubscribe1 = onSnapshot(unreadCountQuery, snapshot => setMessageStat({ communityId, channelId, unreadCount: snapshot.size }))
      const unsubscribe2 = onSnapshot(lastMessageQuery, snapshot => setMessageStat({ communityId, channelId, lastMessage: snapshot.docs[0]?.data() }))
      return () => (unsubscribe1(), unsubscribe2())
    })
    return () => unsubscribers.forEach(unsubscribe => unsubscribe())
  }, [channels])

  if (!messageStats) return <LoadingIndicator />

  return (
    <MessageStatsContext.Provider value={messageStats}>
      {children}
    </MessageStatsContext.Provider>
  )
}

export function useMessageStats() {
  return useContext(MessageStatsContext)
}
