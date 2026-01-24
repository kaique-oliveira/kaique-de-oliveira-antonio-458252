import { useEffect, useState } from 'react'
import { listPets, type Pet } from '../shared/api/pets.service'

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadPets() {
    setLoading(true)
    const data = await listPets(page, search)
   setPets(data.content)
    setLoading(false)
  }

  useEffect(() => {
    loadPets()
  }, [page, search])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Pets</h1>

      <input
        className="border p-2 w-full max-w-sm"
        placeholder="Buscar por nome"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading && <p>Carregando...</p>}

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pets.map(pet => (
          <li key={pet.id} className="border p-4 rounded">
            <p><b>Nome:</b> {pet.nome}</p>
            <p><b>Raça:</b> {pet.raca}</p>
            <p><b>Idade:</b> {pet.idade}</p>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 border"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 border"
        >
          Próxima
        </button>
      </div>
    </div>
  )
}