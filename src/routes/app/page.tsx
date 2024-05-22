import { MaterialSymbolsAdd, MaterialSymbolsSearch, MingcuteAnnouncementLine } from "@/components/Icons";
import { UserButton } from "@clerk/clerk-react";

export default function AppPage() {
  return (
    <>
      <header className="shadow">
        <div className="container flex items-center gap-2 py-4">
          <img src="/logo.jpeg" alt="fupre logo" className="h-6" />
          <div className="mr-auto font-semibold">Fupre Community</div>
          <MaterialSymbolsAdd className="text-xl text-gray-600" />
          <MaterialSymbolsSearch className="text-xl text-gray-600" />
          <MingcuteAnnouncementLine className="text-xl text-gray-600" />
          <UserButton />
        </div>
      </header>
    </>
  )
}
