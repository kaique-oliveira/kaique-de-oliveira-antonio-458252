import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PawPrint, Lock, User } from 'lucide-react'
import { login } from '../shared/api/auth.service'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data = await login(username, password)

      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)

      navigate('/pets')
    } catch {
      setError('Usuário ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="bg-green-100 text-green-700 p-3 rounded-full">
            <PawPrint size={28} />
          </div>
          <h1 className="text-lg font-semibold text-gray-800">
            Pet Manager
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Acesse sua conta para gerenciar pets e tutores
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="w-full border border-gray-200 rounded-xl pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="w-full border border-gray-200 rounded-xl pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-xl font-medium transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}