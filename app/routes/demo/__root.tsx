import { Outlet } from 'react-router'

export default function DemoRoot() {
  return (
    <main className="p-4">
      <h1 className="text-3xl">Demonstrations</h1>
      <Outlet />
    </main>
  )
}
