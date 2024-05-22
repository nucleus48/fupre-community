import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="container h-svh min-h-max grid place">
      <div className="mx-auto py-16">
        <Outlet />
      </div>
    </main>
  )
}
