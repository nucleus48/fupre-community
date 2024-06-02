import { firebaseRefs } from "@/lib/firebase"
import { useChannels } from "@/providers/ChannelsProvider"
import { useCommunities } from "@/providers/CommunitiesProvider"
import { Message, User } from "@/types"
import { onSnapshot, orderBy, query, where } from "firebase/firestore"
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import MessageText from "./MessageText"
import { useMessageStats } from "@/providers/MessageStatsProvider"

export type MessageTypeProps = {
  message: Message,
  user: User
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>()
  const { activeChannel } = useChannels()
  const { activeCommunity } = useCommunities()
  const messageStats = useMessageStats()
  const messageStat = useMemo(() => messageStats.find(stat => stat.channelId == activeChannel?.id), [messageStats, activeChannel])
  const divRef = useRef<HTMLDivElement>(null)

  const usersQuery = query(firebaseRefs.users,
    where("uid", "in", activeChannel?.members || []))

  const messagesQuery = query(firebaseRefs.messages(
    activeCommunity?.id || "",
    activeChannel?.id || ""
  ), orderBy("createdAt"))

  useLayoutEffect(() => {
    setMessages([])
  }, [activeChannel, activeCommunity])

  useEffect(() => {
    return onSnapshot(messagesQuery, snapshot => {
      const messages = snapshot.docs.reduce((prev, curr) => {
        const lastData = prev.pop()
        const currData = curr.data()

        if (!lastData) return [currData] as Message[]
        if (currData.senderId == lastData.senderId) {
          return [...prev, lastData, { ...currData, group: true }] as Message[]
        }
        return [...prev, lastData, currData] as Message[]
      }, [] as Message[])
      setMessages(messages)
    })
  }, [activeCommunity, activeChannel])

  useEffect(() => onSnapshot(usersQuery, snapshot => {
    const users = snapshot.docs.map(doc => doc.data())
    setUsers(users)
  }), [activeChannel])

  useLayoutEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [messages])

  if (!users) return <div></div>

  return (
    <div ref={divRef} className="pb-16 overflow-y-auto flex flex-col gap-2 p-2">
      {messages.map((message, index) => {
        if (messageStat?.unreadCount?.length && index == (messages.length - 1 - Number(messageStat?.unreadCount?.length))) {
          return (
            <Fragment key={crypto.randomUUID()}>
              <MessageType message={message} user={getMessageUser(message.senderId, users)} />
              <div className="text-sm self-center bg-gray-600 my-4 rounded-lg px-2 py-1 font-medium text-white">
                {messageStat?.unreadCount?.length} unread message{Number(messageStat?.unreadCount?.length) > 1 && "s"}
              </div>
            </Fragment>
          )
        }
        return <MessageType key={crypto.randomUUID()} message={message} user={getMessageUser(message.senderId, users)} />
      })}
    </div>
  )
}

function MessageType({ message, user }: MessageTypeProps) {
  switch (message.type) {
    case "text":
      return <MessageText message={message} user={user} />
    default:
      throw Error(`${message.type} message type not supported`)
  }
}

function getMessageUser(userId: string, users: User[]) {
  return users.find(user => user.uid == userId)!
}
