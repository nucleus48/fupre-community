import { createChannel } from "@/lib/firestore"
import { useCommunities } from "@/providers/CommunitiesProvider"
import { useAuth } from "@clerk/clerk-react"
import { FormEvent, useState } from "react"
import Modal from "./Modal"
import { FluentPeopleCommunity16Regular, MaterialSymbolsAdd, MaterialSymbolsClose } from "./Icons"

export default function AddNewChannel() {
  const { activeCommunity } = useCommunities()
  const [openAdd, setOpenAdd] = useState(false)
  const [channelPhoto, setChannelPhoto] = useState<File | null>()
  const [submitting, setSubmitting] = useState(false)
  const { userId } = useAuth()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const photo = formData.get("channel-photo") as File
    const name = formData.get("channel-name") as string
    const description = formData.get("channel-description") as string
    const privateChannel = formData.get("private-channel") == "on"
    const sendMessages = formData.get("send-messages") == "on"
    const uid = formData.get("uid") as string

    try {
      await createChannel(uid, activeCommunity?.id || "", photo, { name, description, sendMessages, privateChannel })
    } catch (error) {
      throw error
    } finally {
      setSubmitting(false)
      setOpenAdd(false)
    }
  }

  return (
    <>
      <div className="bg-white fixed bottom-0 inset-x-0 p-4">
        <div className="flex items-center justify-center gap-2 btn w-full rounded-full" onClick={() => setOpenAdd(true)}>
          <MaterialSymbolsAdd className="text-xl" />
          <span>Add new channel</span>
        </div>
      </div>
      <Modal open={openAdd}>
        <form onSubmit={handleSubmit} className="bg-gray-100 rounded-xl">
          <input type="hidden" name="uid" value={userId || ""} />
          <div className="flex justify-between items-center py-3 px-4">
            <h2 className="font-semibold text-lg">Create new channel</h2>
            <MaterialSymbolsClose className="text-xl text-gray-600" onClick={() => setOpenAdd(false)} />
          </div>
          <div className="bg-white rounded-xl p-4 pb-12 space-y-4 border-t">
            <div className="flex gap-4 items-center">
              <div className="size-16 overflow-hidden grid place-items-center bg-gray-100 rounded-full">
                {channelPhoto
                  ? <img src={URL.createObjectURL(channelPhoto)} alt="community photo" className="w-full h-full object-cover" />
                  : <FluentPeopleCommunity16Regular className="text-3xl" />}
              </div>
              <label className="grid *:row-start-1 *:col-start-1 place-items-center">
                <input name="channel-photo" accept="image/*" onChange={e => setChannelPhoto(e.currentTarget.files?.item(0))} className="w-1" type="file" required />
                <div className="font-medium text-sm bg-blue-50 py-2 px-4 rounded-full">Choose photo</div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="private-channel" className="font-medium">Private channel</label>
              <input type="checkbox" name="private-channel" className="appearance-none w-10 h-6 transition-all bg-gray-200 rounded-full before:size-4 before:rounded-full relative before:bg-white before:absolute before:transition-all before:left-1 before:top-1 checked:before:translate-x-4 checked:bg-blue-600" />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="send-messages" className="font-medium">Send messages</label>
              <input type="checkbox" name="send-messages" defaultChecked className="appearance-none w-10 h-6 transition-all bg-gray-200 rounded-full before:size-4 before:rounded-full relative before:bg-white before:absolute before:transition-all before:left-1 before:top-1 checked:before:translate-x-4 checked:bg-blue-600" />
            </div>
            <div>
              <label className="font-medium" htmlFor="channel-name">Name</label>
              <input className="input" name="channel-name" required />
            </div>
            <div>
              <label className="font-medium" htmlFor="channel-description">Description</label>
              <input className="input" name="channel-description" />
            </div>
            <div>
              <button disabled={submitting} className="btn w-full rounded-lg">Add community</button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

