import { Link } from 'react-router'

export default function DemoColors() {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div>
        <Link
          to="/demo"
          prefetch="render"
          className="text-lg font-semibold text-grape-400"
        >
          ← Demo Index
        </Link>
      </div>
      <h2 className="text-2xl">Colors</h2>
    </div>
  )
}
