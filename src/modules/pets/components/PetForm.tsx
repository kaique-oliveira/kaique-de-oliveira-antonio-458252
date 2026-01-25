import { useState } from 'react'
import type { CreatePetInput } from '../../../shared/api/pets.service'

type Props = {
  initialValues?: CreatePetInput
  onSubmit: (data: CreatePetInput) => void
  loading?: boolean
}

export function PetForm({ initialValues, onSubmit, loading }: Props) {
  const [form, setForm] = useState<CreatePetInput>({
    nome: initialValues?.nome ?? '',
    raca: initialValues?.raca ?? '',
    idade: initialValues?.idade ?? null,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: name === 'idade' ? Number(value) || null : value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="raca"
        placeholder="Raça"
        value={form.raca}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="idade"
        type="number"
        placeholder="Idade"
        value={form.idade ?? ''}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-slate-900 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Salvar
      </button>
    </form>
  )
}