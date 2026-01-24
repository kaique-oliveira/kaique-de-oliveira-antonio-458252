import { useState } from 'react'
import { login } from '../shared/api/auth.service'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  try {
    const data = await login(username, password)

    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)

    navigate('/pets')
  } catch (error) {
    alert('Credenciais inválidas')
  }
}

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <input
        className="w-full border p-2"
        placeholder="User Name"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="w-full border p-2"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="w-full bg-slate-900 text-white p-2">
        Entrar
      </button>
    </form>
  )
}