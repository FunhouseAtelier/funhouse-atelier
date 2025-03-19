import { Link, Outlet } from 'react-router'

export default function DemoRoot() {
  return (
    <main className="p-4">
      <Link
        to="/"
        prefetch="render"
        className={`
            text-2xl font-semibold
            hover:underline
            text-grape
            dark:text-gold
          `}
      >
        ← Home
      </Link>
      <h1
        className={`
          my-2
          text-6xl font-bold
        `}
      >
        Demonstrations
      </h1>
      <Outlet />
    </main>
  )
}
