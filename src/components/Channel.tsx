import formatData from "@/lib/utils/formatDate";
import { MessageStat } from "@/providers/MessageStatsProvider";
import { Channel as ChannelType } from "@/types";
import { PropsWithChildren } from "react";

export default function Channel(props: PropsWithChildren<ChannelType & MessageStat & { active: () => void }>) {
  return (
    <div className="flex items-center gap-3" onClick={() => props.active()}>
      {props.children ? props.children : <div className="shrink-0 row-start-1 col-start-1 row-span-2 size-12 rounded-full overflow-hidden">
        <img className="w-full h-full object-cover" src={props.photoURL} alt="community photo" />
      </div>}
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

