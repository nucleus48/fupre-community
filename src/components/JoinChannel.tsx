import { joinChannel } from "@/lib/firestore";
import { useCommunities } from "@/providers/CommunitiesProvider";
import { Channel } from "@/types";
import { useAuth } from "@clerk/clerk-react";

export default function JoinChannel(props: Channel) {
  const { userId } = useAuth()
  const { activeCommunity: community } = useCommunities()

  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0 row-start-1 col-start-1 row-span-2 size-12 rounded-full overflow-hidden">
        <img className="w-full h-full object-cover" src={props.photoURL} alt="community photo" />
      </div>
      <div className="flex-1">
        <div className="font-medium">{props.name}</div>
        <div>{props.requests.includes(userId || "")
          ? "Requesting..."
          : <span>{props.members.length} member{!!props.members.length && "s"}</span>}
        </div>
      </div>
      {props.requests.includes(userId || "") || <div className="shrink-0">
        <button className="btn text-sm py-1" onClick={() => joinChannel(userId || "", community?.id || "", props.id)}>
          {props.privateChannel ? "Request" : "Join"}
        </button>
      </div>}
    </div>
  )
}
