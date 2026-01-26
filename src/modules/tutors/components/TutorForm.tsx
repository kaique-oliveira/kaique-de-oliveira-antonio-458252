import { useState } from 'react'
import type { CreateTutorInput } from '../../../shared/api/tutors.service'

type Props = {
  initialValues?: CreateTutorInput
  onSubmit: (data: CreateTutorInput) => Promise<void>
  loading?: boolean
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '')

  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
  }

  return digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, '')
}

export function TutorForm({ initialValues, onSubmit, loading }: Props) {
  const [nome, setNome] = useState(initialValues?.nome ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [telefone, setTelefone] = useState(initialValues?.telefone ? formatPhone(initialValues.telefone) : '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return

    await onSubmit({
      nome,
      email,
      telefone: telefone ? onlyNumbers(telefone) : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nome */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Nome</label>
        <input
          className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          placeholder="Nome do tutor"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Telefone */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Telefone</label>
        <input
          className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          placeholder="(99) 99999-9999"
          value={telefone}
          onChange={(e) => setTelefone(formatPhone(e.target.value))}
          maxLength={15}
          inputMode="numeric"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white py-2 rounded-xl font-medium transition cursor-pointer"
      >
        {loading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  )
}
