import { Suspense, lazy } from "react"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import GlobalErrorBoundary from "./routes/global-error"
import LoadingIndicator from "./components/LoadingIndicator"
import { SignIn, SignUp } from "@clerk/clerk-react"
import AuthLayout from "./routes/auth/layout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route ErrorBoundary={GlobalErrorBoundary} Component={lazy(() => import("./routes/layout"))}>
      <Route path="/" Component={lazy(() => import("@/routes/page"))} />
      <Route Component={AuthLayout}>
        <Route path="/signup" Component={SignUp} />
        <Route path="/signin" Component={SignIn} />
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <RouterProvider router={router} fallbackElement={<LoadingIndicator />} />
    </Suspense>
  )
}

