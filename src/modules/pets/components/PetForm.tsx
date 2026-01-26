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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nome */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Nome
        </label>

        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome do pet"
          className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          required
        />
      </div>

      {/* Raça */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Raça
        </label>

        <input
          name="raca"
          value={form.raca}
          onChange={handleChange}
          placeholder="Raça do pet"
          className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          required
        />
      </div>

      {/* Idade */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Idade
        </label>

        <input
          name="idade"
          type="number"
          value={form.idade ?? ''}
          onChange={handleChange}
          placeholder="Idade (opcional)"
          className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          min={0}
        />
      </div>

      {/* Actions */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded-xl font-medium transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}