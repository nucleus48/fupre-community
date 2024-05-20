import { Suspense, lazy } from "react"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import GlobalErrorBoundary from "./routes/global-error"
import LoadingIndicator from "./components/LoadingIndicator"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route ErrorBoundary={GlobalErrorBoundary} Component={lazy(() => import("./routes/layout"))}>
      <Route path="/" Component={lazy(() => import("@/routes/page"))} />
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

