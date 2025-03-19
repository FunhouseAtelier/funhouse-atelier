import { Link } from 'react-router'

export default function DemoRoutes() {
  return (
    <div className="p-4">
      <Link
        to="/demo"
        prefetch="render"
        className={`
            text-2xl font-semibold
            hover:underline
            text-grape
            dark:text-gold
          `}
      >
        ← Demo Index
      </Link>

      <h2
        className={`
          my-2
          text-5xl font-bold
        `}
      >
        Routes
      </h2>
    </div>
  )
}
