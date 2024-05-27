import { Timestamp } from "firebase/firestore"

export type User = {
  uid: string
  firstname: string
  lastname: string
  email: string
  username: string
  photoURL: string
  createdAt: Timestamp
}

export type Community = {
  id: string
  name: string
  description: string
  photoURL: string
  createdAt: Timestamp
  members: string[]
  admins: string[]
}

export type Channel = {
  id: string
  name: string
  description: string
  photoURL: string
  sendMessages: boolean
  createdAt: Timestamp
  privateChannel: boolean
  requests: string[]
  members: string[]
  admins: string[]
  pinnedMessages: string[]
}

export enum DefaultChannel {
  Announcement = "Announcement",
  QAForum = "Q&A Forum",
  Chatbox = "Chatbox"
}

export type MessageBase<T extends { type: string }> = {
  id: string
  senderId: string
  createdAt: Timestamp
  forwarded?: string
  reactions: Reaction[]
} & T

export type MessageText = MessageBase<{
  type: "text"
  content: string
}>

export type Message = MessageText

export type Reaction = {
  id: string
  senderId: string
  emoji: ""
}
