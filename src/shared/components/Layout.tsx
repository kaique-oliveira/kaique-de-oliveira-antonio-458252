import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PawPrint, Users, LogOut } from 'lucide-react'

export function Layout() {
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  const navItem = (to: string, label: string, Icon: any) => {
    const active = location.pathname.startsWith(to)

    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition
          ${
            active
              ? 'bg-green-100 text-green-700'
              : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
          }
        `}
      >
        <Icon size={18} />
        <span className="hidden sm:inline">{label}</span>
      </Link>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 font-semibold text-green-700"
          >
            <PawPrint />
            <span className="hidden sm:inline">Pet Manager</span>
          </motion.div>

          {/* Nav */}
          <nav className="flex items-center gap-2">
            {navItem('/pets', 'Pets', PawPrint)}
            {navItem('/tutores', 'Tutores', Users)}
          </nav>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer
              text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sair</span>
          </motion.button>
        </div>
      </header>

      {/* Conteúdo */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1 px-4 py-6 sm:px-6"
      >
        <Outlet />
      </motion.main>
    </div>
  )
}