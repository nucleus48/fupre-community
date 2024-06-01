import { firebaseRefs } from "@/lib/firebase";
import { useUser } from "@clerk/clerk-react";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function SyncUserData() {
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      setDoc(doc(firebaseRefs.users, user.id), {
        uid: user.id,
        username: user.username || "",
        photoURL: user.imageUrl,
        createdAt: Timestamp.fromDate(user.createdAt!),
        email: user.primaryEmailAddress?.emailAddress,
        firstname: user.firstName,
        lastname: user.lastName
      }, { merge: true })
    }
  }, [user])

  return <></>
}

