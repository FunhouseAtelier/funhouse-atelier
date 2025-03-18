import { Link } from 'react-router'

export default function DemoIndex() {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div>
        <Link
          to="/demo/colors"
          prefetch="render"
          className="text-lg font-semibold bg-grape text-white px-4 py-2 rounded-lg"
        >
          Colors
        </Link>
      </div>
      <div>
        <Link
          to="/demo/routes"
          prefetch="render"
          className="text-lg font-semibold bg-grape text-white px-4 py-2 rounded-lg"
        >
          Routes
        </Link>
      </div>
    </div>
  )
}
