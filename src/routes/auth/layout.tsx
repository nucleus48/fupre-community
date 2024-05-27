import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="container h-svh min-h-max grid place-items-center">
      <div className="w-max py-16">
        <Outlet />
      </div>
    </main>
  )
}
