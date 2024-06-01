import AddNewChannel from "@/components/AddNewChannel"
import Channel from "@/components/Channel"
import { EvaArrowBackOutline, IonChatboxEllipsesOutline, MingcuteAnnouncementLine, WpfAskQuestion } from "@/components/Icons"
import JoinChannel from "@/components/JoinChannel"
import useDefaultChannels from "@/hooks/useDefaultChannels"
import joinList from "@/lib/utils/joinList"
import mergeSort from "@/lib/utils/mergeSort"
import { useChannels } from "@/providers/ChannelsProvider"
import { useCommunities } from "@/providers/CommunitiesProvider"
import { useMessageStats } from "@/providers/MessageStatsProvider"
import { useAuth } from "@clerk/clerk-react"
import { useMemo } from "react"

export default function ChannelList(props: {
  openMessaging: () => void
  back: () => void
}) {
  const { activeCommunity } = useCommunities()
  if (activeCommunity) return <ChannelListDefined {...props} />
  return <></>
}

function ChannelListDefined(props: {
  openMessaging: () => void
  back: () => void
}) {
  const { userId } = useAuth()
  const messageStats = useMessageStats()
  const { activeCommunity: community } = useCommunities()
  const { channels: allChannels, setActiveChannel } = useChannels()
  const channels = useMemo(() => allChannels.filter(channel => channel.communityId == community?.id), [community, allChannels])
  const joinedChannels = useMemo(() => mergeSort(joinList(channels.filter(channel => channel.members.includes(userId || "")), messageStats, ["id", "channelId"])), [messageStats, channels])
  const otherChannels = useMemo(() => channels.filter(channel => !channel.members.includes(userId || "")), [channels])
  const [announcements, qaforum, chatbox, restChannels] = useDefaultChannels(joinedChannels)

  return (
    <>
      <header className="py-4 shadow">
        <div className="container flex items-center gap-3">
          <EvaArrowBackOutline onClick={() => props.back()} className="text-xl text-gray-600" />
          <div className="shrink-0 row-start-1 col-start-1 row-span-2 size-12 rounded-xl overflow-hidden">
            <img className="w-full h-full object-cover" src={community?.photoURL} alt="community photo" />
          </div>
          <div className="flex-1">
            <div className="font-medium">{community?.name}</div>
            <div>{community?.members.length} member{!!community?.members.length && "s"}</div>
          </div>
        </div>
      </header>
      <div className="pb-24">
        <section className="container space-y-4 pt-4">
          <Channel active={() => (setActiveChannel(announcements!), props.openMessaging())} {...announcements!}>
            <div className="text-2xl grid place-items-center shrink-0 row-start-1 col-start-1 row-span-2 size-12 rounded-xl bg-blue-100 text-blue-600">
              <MingcuteAnnouncementLine />
            </div>
          </Channel>
          <Channel active={() => (setActiveChannel(qaforum!), props.openMessaging())} {...qaforum!}>
            <div className="text-2xl grid place-items-center shrink-0 row-start-1 col-start-1 row-span-2 size-12 rounded-xl bg-blue-100 text-blue-600">
              <WpfAskQuestion />
            </div>
          </Channel>
          <Channel active={() => (setActiveChannel(chatbox!), props.openMessaging())} {...chatbox!}>
            <div className="text-2xl grid place-items-center shrink-0 row-start-1 col-start-1 row-span-2 size-12 rounded-xl bg-blue-100 text-blue-600">
              <IonChatboxEllipsesOutline />
            </div>
          </Channel>
        </section>
        {!!restChannels.length && (
          <section className="container space-y-4 pt-4">
            <div className="text-sm font-medium text-gray-600">Channels you're in</div>
            {restChannels.map(channel =>
              <Channel key={channel.id} active={() => (setActiveChannel(channel), props.openMessaging())} {...channel} />
            )}
          </section>
        )}
        {!!otherChannels.length && (
          <section className="container space-y-4 pt-4">
            <div className="text-sm font-medium text-gray-600">Channels you can join</div>
            {otherChannels.map(channel =>
              <JoinChannel key={channel.id} {...channel} />
            )}
          </section>
        )}
      </div>
      <AddNewChannel />
    </>
  )
}

