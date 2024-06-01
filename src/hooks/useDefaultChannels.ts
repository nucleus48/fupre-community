import { Channel, DefaultChannel } from "@/types";
import { useMemo } from "react";

export default function useDefaultChannels<T extends Channel>(channels: T[]) {
  const announcements = useMemo(() => channels.find(channel => channel.name == DefaultChannel.Announcement), [channels])
  const qaforum = useMemo(() => channels.find(channel => channel.name == DefaultChannel.QAForum), [channels])
  const chatbox = useMemo(() => channels.find(channel => channel.name == DefaultChannel.Chatbox), [channels])
  const restChannels = useMemo(() => channels.filter(channel => {
    switch (channel.name) {
      case DefaultChannel.Announcement:
      case DefaultChannel.QAForum:
      case DefaultChannel.Chatbox:
        return false
      default:
        return true
    }
  }), [channels])

  return [announcements, qaforum, chatbox, restChannels] as const
}
