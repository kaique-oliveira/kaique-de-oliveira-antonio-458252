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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border p-2"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <input
        className="w-full border p-2"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full border p-2"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <button className="bg-slate-900 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  )
}