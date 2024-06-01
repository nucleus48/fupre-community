import { Timestamp, addDoc, arrayUnion, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firebaseRefs, storage } from "./firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { Channel, Community, DefaultChannel } from "@/types";

export async function createChannel(
  uid: string,
  communityId: string,
  photo: File,
  data: Pick<Channel,
    | "name"
    | "description"
    | "privateChannel"
    | "sendMessages"
  >
) {
  const channelRef = await addDoc(firebaseRefs.channels(communityId), {
    name: data.name,
    description: data.description,
    privateChannel: data.privateChannel,
    sendMessages: data.sendMessages,
    id: "",
    photoURL: "",
    requests: [],
    pinnedMessages: [],
    createdAt: Timestamp.now(),
    members: [uid],
    admins: [uid]
  })

  const photoRef = ref(
    storage,
    `channels/${channelRef.id}/photo`
  )
  await uploadBytes(photoRef, photo)
  const photoURL = await getDownloadURL(photoRef)

  await updateDoc(channelRef, {
    id: channelRef.id,
    photoURL
  })

  return channelRef
}

export async function createCommunity(
  uid: string,
  photo: File,
  data: Pick<Community, "name" | "description">
) {
  const communityRef = await addDoc(firebaseRefs.communities, {
    name: data.name,
    description: data.description,
    id: "",
    photoURL: "",
    admins: [uid],
    members: [uid],
    createdAt: Timestamp.now()
  })

  const photoRef = ref(
    storage,
    `communities/${communityRef.id}/photo`
  )
  await uploadBytes(photoRef, photo)
  const photoURL = await getDownloadURL(photoRef)

  await Promise.all([
    createChannel(uid, communityRef.id, photo, {
      name: DefaultChannel.Announcement,
      description: "",
      sendMessages: false,
      privateChannel: false
    }),
    createChannel(uid, communityRef.id, photo, {
      name: DefaultChannel.QAForum,
      description: "",
      sendMessages: true,
      privateChannel: false
    }),
    createChannel(uid, communityRef.id, photo, {
      name: DefaultChannel.Chatbox,
      description: "",
      sendMessages: true,
      privateChannel: false
    }),
    updateDoc(communityRef, {
      photoURL,
      id: communityRef.id
    })
  ])

  return communityRef
}

export async function joinChannel(uid: string, communityId: string, channelId: string) {
  const channelRef = doc(firebaseRefs.channels(communityId), channelId)
  const channel = await getDoc(channelRef)

  if (channel.data()?.privateChannel) {
    await updateDoc(channelRef, { requests: arrayUnion(uid) })
  }

  else {
    await updateDoc(channelRef, { members: arrayUnion(uid) })
  }
}

export async function joinCommunity(uid: string, communityId: string) {
  const communityRef = doc(firebaseRefs.communities, communityId)
  const defaultChannels = query(firebaseRefs.channels(communityId), where("name", "in", [
    DefaultChannel.Announcement,
    DefaultChannel.Chatbox,
    DefaultChannel.QAForum
  ]))
  const channels = await getDocs(defaultChannels)

  await Promise.all([
    updateDoc(communityRef,
      { members: arrayUnion(uid) }),
    ...channels.docs.map(doc =>
      joinChannel(uid, communityId, doc.id))
  ])
}
