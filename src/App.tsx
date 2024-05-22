import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import GlobalErrorBoundary from "./routes/global-error"
import { SignIn, SignUp } from "@clerk/clerk-react"
import AuthLayout from "./routes/auth/layout"
import RootLayout from "./routes/layout"
import HomePage from "@/routes/page"
import AppLayout from "@/routes/app/layout"
import AppPage from "./routes/app/page"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<GlobalErrorBoundary />} element={<RootLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<AppPage />} />
      </Route>
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}

