import { useChannels } from "@/providers/ChannelsProvider"
import { EvaArrowBackOutline } from "./Icons"
import { useCallback, useEffect, useMemo, useState } from "react"
import { DefaultChannel } from "@/types"
import { useCommunities } from "@/providers/CommunitiesProvider"
import { useMessageStats } from "@/providers/MessageStatsProvider"
import { useAuth } from "@clerk/clerk-react"
import { markMessageAsRead } from "@/lib/firestore"

export default function MessageHeader(props: { back: () => void }) {
  const { activeChannel } = useChannels()
  const { activeCommunity } = useCommunities()
  const [text, setText] = useState("")
  const messageStats = useMessageStats()
  const messageStat = useMemo(() => messageStats.find(stat => stat.channelId == activeChannel?.id), [messageStats, activeChannel])
  const { userId } = useAuth()

  const handleBackButton = useCallback(async () => {
    await Promise.all(messageStat?.unreadCount?.map(messageId => markMessageAsRead(
      userId || "",
      activeCommunity?.id || "",
      activeChannel?.id || "",
      messageId
    )) || [])
    props.back()
  }, [messageStat])



  useEffect(() => {
    switch (activeChannel?.name) {
      case DefaultChannel.Announcement:
      case DefaultChannel.QAForum:
      case DefaultChannel.Chatbox:
        setText(activeCommunity?.name || "")
    }
  }, [activeChannel])

  return (
    <header className="py-4 shadow">
      <div className="container flex items-center gap-3">
        <EvaArrowBackOutline onClick={handleBackButton} className="text-xl text-gray-600" />
        <div className="shrink-0 row-start-1 col-start-1 row-span-2 size-12 rounded-xl overflow-hidden">
          <img className="w-full h-full object-cover" src={activeChannel?.photoURL} alt="community photo" />
        </div>
        <div className="flex-1">
          <div className="font-medium">{activeChannel?.name}</div>
          <div className="text-sm">{text
            ? <span>{text}</span>
            : <span>{activeChannel?.members.length} member{!!activeChannel?.members.length && "s"}</span>}
          </div>
        </div>
      </div>
    </header>
  )
}

