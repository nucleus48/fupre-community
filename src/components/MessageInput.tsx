import { sendTextMessage } from "@/lib/firestore"
import { useChannels } from "@/providers/ChannelsProvider"
import { useCommunities } from "@/providers/CommunitiesProvider"
import { useAuth } from "@clerk/clerk-react"
import { useCallback, useState } from "react"
import { MingcuteSendFill } from "./Icons"

export default function MessageInput() {
  const [text, setText] = useState("")
  const { activeCommunity } = useCommunities()
  const { activeChannel } = useChannels()
  const { userId } = useAuth()

  const handleSendMessage = useCallback(() => {
    if (!text) return
    sendTextMessage(
      userId || "",
      activeCommunity?.id || "",
      activeChannel?.id || "",
      text,
      activeChannel?.members || [])
    setText("")
  }, [text])

  return (
    <div className="flex gap-2 items-center px-4 py-2">
      <textarea rows={1} className="input border-2 rounded-full flex-1 px-4 outline-none" value={text} onChange={e => setText(e.currentTarget.value)} />
      <button className="grid place-items-center bg-blue-600 size-10 rounded-full shrink-0" onClick={handleSendMessage}>
        <MingcuteSendFill className="text-white text-2xl" />
      </button>
    </div>
  )
}

