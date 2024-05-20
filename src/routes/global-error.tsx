import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function GlobalErrorBoundary() {
  const error = useRouteError()

  if (import.meta.env.DEV) console.error(error)

  if (isRouteErrorResponse(error) && error.status == 404) {
    return (
      <main className="container text-center h-svh flex flex-col justify-center space-y-4">
        <h1 className="font-bold text-9xl">404</h1>
        <p className="text-3xl">Page not found</p>
        <div className="px-4 text-lg">Sorry, the page you are looking for does not exist</div>
        <div className="pt-4">
          <Link to="/" className="btn">Go to Home</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container text-center h-svh flex flex-col justify-center space-y-4">
      <h1 className="font-bold text-3xl">Unknown Error</h1>
      <p className="text-lg px-4">Sorry, an unknown error occurred.</p>
      <div className="pt-4 flex gap-4 *:flex-1 w-[300px] mx-auto">
        <button className="btn text-black bg-white border border-blue" onClick={() => location.reload()}>Retry</button>
        <Link to="/" className="btn">Go to Home</Link>
      </div>
    </main>
  )
}
