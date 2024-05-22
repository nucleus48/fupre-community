import { db } from "@/lib/firebase";
import { useUser } from "@clerk/clerk-react";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function SyncUserData() {
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.id)
      updateDoc(userRef, {
        uid: user.id,
        username: user.username,
        photoURL: user.imageUrl,
        createdAt: Timestamp.fromDate(user.createdAt!)
      })
    }
  }, [user])

  return <></>
}

