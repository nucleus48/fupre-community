import { useAuth } from "@clerk/clerk-react";
import { MessageTypeProps } from "./MessageList";

export default function MessageText({ user, message }: MessageTypeProps) {
  const { userId } = useAuth()
  const sender = message.senderId == userId

  return (
    <div className={`${sender ? "rounded-tr-none bg-blue-600 self-end text-white" : `${message.group || "rounded-tl-none"} relative bg-slate-200 ml-9`} relative px-2 py-1 rounded-xl self-start max-w-[250px]`}>
      {message.group || sender || <div className="font-bold text-xl grid place-items-center absolute top-0 -left-9 size-8 overflow-hidden rounded-full bg-slate-200">
        {user.photoURL
          ? <img className="w-full h-full object-cover" src={user.photoURL} alt="profile" />
          : <span>{user.username[0].toUpperCase()}</span>}
      </div>}
      {!sender && <div className="text-xs">{user.username}</div>}
      <div>
        <span className="whitespace-pre-wrap">{message.content}</span>
        <span className="text-transparent">________</span>
        <span className="text-xs absolute bottom-1 right-2">{message.createdAt.toDate().toLocaleTimeString(undefined, { timeStyle: "short" })}</span>
      </div>
    </div>
  )
}

