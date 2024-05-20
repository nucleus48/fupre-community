import { Timestamp } from "firebase/firestore"

export type User = {
  uid: string
  username: string
  email: string
  photoURL: string
  verified: boolean
}

export type AppUser = {
  uid: string
  username: string
  photoURL: string
  createdAt: Timestamp
}

export type CommunityRequest = {
  private: true
  request: string[]
} | Record<"private", false>

export type Community = {
  name: string
  description: string
  photoURL: string
  createdAt: Timestamp
  members: string[]
  admins: string[]
} & CommunityRequest

export type ChannelRequest = {
  private: true
  request: string[]
} | Record<"private", false>

export type Channel = {
  name: string
  description: string
  photoURL: string
  sendMessages: boolean
  disappearingMessages?: number
  createdAt: Timestamp
  members: string[]
  admins: string[]
} & ChannelRequest

export type MessageText = {
  type: "text"
  content: string
}

export type MessageImage = {
  type: "image"
  imageURL: string
  content: string
}

export type MessageVideo = {
  type: "video"
  videoURL: string
  content: string
}

export type MessageAudio = {
  type: "audio"
  audioURL: string
}

export type MessageDocument = {
  type: "document"
  documentURL: string
  content: string
}

export type MessageYoutube = {
  type: "youtube"
  videoURL: string
  content: string
}

export type MessageOpenGraph = {
  type: "openGraph",
  imageURL: string
  name: string
  description: string
  url: string
  content: string
}

export type Message = {
  senderID: string
  replyTo: string
  forwarded: boolean
  pinned: boolean
  createdAt: Timestamp
  unreadBy: string[]
  reactions: Reaction[]
} & (
    | MessageText
    | MessageImage
    | MessageAudio
    | MessageVideo
    | MessageYoutube
    | MessageOpenGraph
    | MessageDocument
  )

export type Reaction = {
  uid: string
  type: string
  createdAt: Timestamp
}
