import { Link } from 'react-router'

export default function DemoIndex() {
  return (
    <div className="p-4 flex flex-col gap-6">
      <Link
        to="/demo/color"
        prefetch="render"
        className={`
            text-5xl font-semibold
            hover:underline
            text-grape
            dark:text-gold
          `}
      >
        Colors →
      </Link>
      <Link
        to="/demo/routes"
        prefetch="render"
        className={`
            text-5xl font-semibold
            hover:underline
            text-grape
            dark:text-gold
          `}
      >
        Routes →
      </Link>
    </div>
  )
}
