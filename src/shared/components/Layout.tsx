import { Outlet, Link } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 bg-slate-900 text-white flex items-center px-6">
        <nav className="flex gap-6">
          <Link to="/pets">Pets</Link>
          <Link to="/tutors">Tutores</Link>
        </nav>
      </header>

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}