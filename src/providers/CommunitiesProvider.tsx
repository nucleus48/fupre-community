import LoadingIndicator from "@/components/LoadingIndicator";
import { firebaseRefs } from "@/lib/firebase";
import mergeSort from "@/lib/utils/mergeSort";
import { Community } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { onSnapshot } from "firebase/firestore";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export type Communities = [joined: Community[], others: Community[]]

export type CommunitiesContextValue = {
  activeCommunity?: Community,
  setActiveCommunity: (community: Community) => void,
  communities: Communities
}

export const CommunitiesContext = createContext<CommunitiesContextValue | null>(null)

export default function CommunitiesProvider({ children }: PropsWithChildren) {
  const [communities, setCommunities] = useState<Communities>()
  const [activeCommunity, setActiveCommunity] = useState<Community>()
  const { userId } = useAuth()

  useEffect(() => onSnapshot(firebaseRefs.communities, snapshot => {
    const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    const communities = data.reduce((prev, curr) => {
      if (curr.members.includes(userId || "")) {
        return [[...prev[0], curr], prev[1]] as Communities
      }
      return [prev[0], [...prev[1], curr]] as Communities
    }, [[], []] as Communities)
    setCommunities([communities[0], mergeSort(communities[1])])
  }), [])


  if (!communities) return <LoadingIndicator />

  return (
    <CommunitiesContext.Provider value={{ activeCommunity, setActiveCommunity, communities }}>
      {children}
    </CommunitiesContext.Provider>
  )
}

export function useCommunities() {
  return useContext(CommunitiesContext)!
}
