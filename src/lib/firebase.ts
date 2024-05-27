import { Channel, Community, Message } from "@/types";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { CollectionReference, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyXXnLm83LKpRdrGKju1S7EmlcBXZRHrc",
  authDomain: "fupre-community.firebaseapp.com",
  projectId: "fupre-community",
  storageBucket: "fupre-community.appspot.com",
  messagingSenderId: "25780715499",
  appId: "1:25780715499:web:b3527c0d3e0f399b9923ae",
  measurementId: "G-8VVN8NZB37"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app)
export const db = getFirestore(app)


export const firebaseRefs = {
  communities: collection(db, "communities") as CollectionReference<Community, Community>,
  channels: (communityId: string) => collection(db, "communities", communityId, "channels") as CollectionReference<Channel, Channel>,
  messages: (communityId: string, channelId: string) => collection(db, "communities", communityId, "channels", channelId, "messages") as CollectionReference<Message, Message>
}
