import formatData from "@/lib/utils/formatDate";
import { MessageStat } from "@/providers/MessageStatsProvider";
import { Community as CommunityType } from "@/types";

export default function Community(props: CommunityType & MessageStat & { active: () => void }) {
  return (
    <div className="flex items-center gap-3" onClick={() => props.active()}>
      <div className="shrink-0 row-start-1 col-start-1 row-span-2 size-12 rounded-xl overflow-hidden">
        <img className="w-full h-full object-cover" src={props.photoURL} alt="community photo" />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div className="font-medium line-clamp-1">{props.name}</div>
          <div className="text-sm">{formatData(props.lastMessage?.createdAt.toDate() || props.createdAt.toDate())}</div>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
          <div className="line-clamp-1">{props.lastMessage
            ? props.lastMessage.content
            : `${props.members.length} member${props.members.length > 1 ? "s" : ""}`}</div>
          {!!props.unreadCount && props.unreadCount < 100 && <div className="bg-blue-600 text-white text-xs size-5 grid place-items-center rounded-full">{props.unreadCount}</div>}
        </div>
      </div>
    </div>
  )
}

