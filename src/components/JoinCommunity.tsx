import { joinCommunity } from "@/lib/firestore";
import { Community } from "@/types";
import { useAuth } from "@clerk/clerk-react";

export default function JoinCommunity(props: Community) {
  const { userId } = useAuth()

  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0 row-start-1 col-start-1 row-span-2 size-12 rounded-xl overflow-hidden">
        <img className="w-full h-full object-cover" src={props.photoURL} alt="community photo" />
      </div>
      <div className="flex-1">
        <div className="font-medium">{props.name}</div>
        <div>{props.members.length} member{!!props.members.length && "s"}</div>
      </div>
      <div className="shrink-0">
        <button className="btn text-sm py-1" onClick={() => joinCommunity(userId || "", props.id)}>Join</button>
      </div>
    </div>
  )
}
