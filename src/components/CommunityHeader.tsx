import { UserButton, useAuth } from "@clerk/clerk-react";
import { EvaArrowBackOutline, FluentPeopleCommunity16Regular, MaterialSymbolsAdd, MaterialSymbolsClose, MaterialSymbolsSearch, MingcuteAnnouncementLine } from "./Icons";
import Modal from "./Modal";
import { FormEvent, useState } from "react";
import { createCommunity } from "@/lib/firestore";

export default function CommunityHeader({ setSearchQuery }: { setSearchQuery: (query: string) => void }) {
  const [openAdd, setOpenAdd] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [communityPhoto, setCommunityPhoto] = useState<File | null>()
  const [submitting, setSubmitting] = useState(false)
  const { userId } = useAuth()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const photo = formData.get("community-photo") as File
    const name = formData.get("community-name") as string
    const description = formData.get("community-description") as string
    const uid = formData.get("uid") as string

    try {
      await createCommunity(uid, photo, { name, description })
    } catch (error) {
      throw error
    } finally {
      setSubmitting(false)
      setOpenAdd(false)
    }
  }

  return (
    <header className="shadow text-xl text-gray-600 sticky top-0 flex items-center gap-2 p-4">

      {openSearch
        ? (
          <div className="bg-white w-full border rounded-full py-2 px-4 flex gap-4 items-center">
            <EvaArrowBackOutline className="text-2xl" onClick={() => (setSearchQuery(""), setOpenSearch(false))} />
            <input type="search" className="placeholder:font-medium input border-none outline-none p-0 rounded-none" onChange={e => setSearchQuery(e.currentTarget.value)} placeholder="Search communities..." />
          </div>
        ) : (
          <>
            <img src="/logo.jpeg" alt="fupre logo" className="logo" />
            <div className="text-gray-900 font-semibold text-lg mr-auto">Fupre Community</div>
            <MaterialSymbolsSearch onClick={() => setOpenSearch(true)} />
            <MaterialSymbolsAdd onClick={() => setOpenAdd(true)} />
            <MingcuteAnnouncementLine />
            <UserButton />
          </>
        )}

      <Modal open={openAdd}>
        <form onSubmit={handleSubmit} className="bg-gray-100 rounded-xl">
          <input type="hidden" name="uid" value={userId || ""} />
          <div className="flex justify-between items-center py-3 px-4">
            <h2 className="font-semibold text-lg">Create community</h2>
            <MaterialSymbolsClose className="text-xl text-gray-600" onClick={() => setOpenAdd(false)} />
          </div>
          <div className="bg-white rounded-xl p-4 pb-12 space-y-4 border-t">
            <div className="flex gap-4 items-center">
              <div className="size-16 overflow-hidden grid place-items-center bg-gray-100 rounded-full">
                {communityPhoto
                  ? <img src={URL.createObjectURL(communityPhoto)} alt="community photo" className="w-full h-full object-cover" />
                  : <FluentPeopleCommunity16Regular className="text-3xl" />}
              </div>
              <label className="grid *:row-start-1 *:col-start-1 place-items-center">
                <input name="community-photo" accept="image/*" onChange={e => setCommunityPhoto(e.currentTarget.files?.item(0))} className="w-1" type="file" required />
                <div className="font-medium text-sm bg-blue-50 py-2 px-4 rounded-full">Choose photo</div>
              </label>
            </div>
            <div>
              <label className="font-medium" htmlFor="community-name">Name</label>
              <input className="input" name="community-name" required />
            </div>
            <div>
              <label className="font-medium" htmlFor="community-description">Description</label>
              <input className="input" name="community-description" />
            </div>
            <div>
              <button disabled={submitting} className="btn w-full rounded-lg">Add community</button>
            </div>
          </div>
        </form>
      </Modal>
    </header>
  )
}

