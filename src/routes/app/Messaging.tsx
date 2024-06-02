import MessageHeader from "@/components/MessageHeader"
import MessageInput from "@/components/MessageInput"
import MessageList from "@/components/MessageList"
import { useChannels } from "@/providers/ChannelsProvider"
import { useAuth } from "@clerk/clerk-react"

function Messaging(props: {
  back: () => void
}) {
  const { activeChannel } = useChannels()
  const { userId } = useAuth()
  return (
    <>
      <MessageHeader back={() => props.back()} />
      <MessageList />
      {activeChannel?.sendMessages || activeChannel?.admins.includes(userId || "")
        ? <MessageInput />
        : <div className="p-4 text-center text-sm font-medium text-gray-700">Only admins can send messages</div>}
    </>
  )
}

export default function(props: {
  back: () => void
}) {
  const { activeChannel } = useChannels()
  if (activeChannel) return <Messaging {...props} />
  return <></>
}
