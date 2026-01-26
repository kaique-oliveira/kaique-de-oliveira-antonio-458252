import { useState } from 'react'
import type { CreateTutorInput } from '../../../shared/api/tutors.service'

type Props = {
  initialValues?: CreateTutorInput
  onSubmit: (data: CreateTutorInput) => Promise<void>
}

export function TutorForm({ initialValues, onSubmit }: Props) {
  const [nome, setNome] = useState(initialValues?.nome ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [telefone, setTelefone] = useState(initialValues?.telefone ?? '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await onSubmit({
      nome,
      email,
      telefone: telefone || null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Telefone</label>
        <input
          className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-xl font-medium transition cursor-pointer"
      >
        Salvar
      </button>
    </form>
  )
}
