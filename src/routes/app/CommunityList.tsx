import Community from "@/components/Community"
import CommunityHeader from "@/components/CommunityHeader"
import JoinCommunity from "@/components/JoinCommunity"
import joinList from "@/lib/utils/joinList"
import mergeSort from "@/lib/utils/mergeSort"
import { useCommunities } from "@/providers/CommunitiesProvider"
import { MessageStat, useMessageStats } from "@/providers/MessageStatsProvider"
import { useMemo, useState } from "react"

export default function CommunityList(props: {
  openCommunity: () => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const { communities: [communities, otherCommunities], setActiveCommunity } = useCommunities()
  const messageStats = useMessageStats()
  const joinedCommunities = useMemo(() => mergeSort(joinList(communities, messageStats, ["id", "communityId"], getCommunityLastMessage)), [messageStats, communities])
  const searchCommunities = useMemo(() => joinedCommunities.filter(value => value.name.toLowerCase().includes(searchQuery.toLowerCase()))
    , [searchQuery, joinedCommunities])
  const searchOtherCommunities = useMemo(() => otherCommunities.filter(value => value.name.toLowerCase().includes(searchQuery.toLowerCase()))
    , [searchQuery, otherCommunities])

  return (
    <>
      <CommunityHeader setSearchQuery={setSearchQuery} />
      <div>
        {!!searchCommunities.length && (
          <section className="container space-y-4 pt-4">
            {searchCommunities.map(community =>
              <Community key={community.id} active={() => (setActiveCommunity(community), props.openCommunity())} {...community} />
            )}
          </section>
        )}
        {!!searchOtherCommunities.length && (
          <section className="container space-y-4 pt-4">
            {!searchQuery && <div className="text-sm font-medium text-gray-600">Latest Communities</div>}
            {searchOtherCommunities.map(community =>
              <JoinCommunity key={community.id} {...community} />
            )}
          </section>
        )}
      </div>
    </>
  )
}


function getCommunityLastMessage(messageStats: MessageStat[]) {
  return messageStats.reduce((curr, next) => {
    let unreadCount = [...(curr.unreadCount || []), ...(next.unreadCount || [])]

    if (Number(curr.lastMessage?.createdAt.seconds) <
      Number(next.lastMessage?.createdAt.seconds)) {
      return { ...next, unreadCount }
    }

    return { ...curr, unreadCount }
  })
}
