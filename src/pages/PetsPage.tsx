import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePets } from '../modules/pets/facade/usePets'

export default function PetsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { items: pets, loading } = usePets(page, search)

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
          <Link key={pet.id} to={`/pets/${pet.id}`} className="border p-4 rounded block">
            <p><b>Nome:</b> {pet.nome}</p>
            <p><b>Raça:</b> {pet.raca}</p>
          </Link>
        ))}
      </ul>

      <div className="flex gap-2">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          Anterior
        </button>
        <button onClick={() => setPage(p => p + 1)}>
          Próxima
        </button>
      </div>
    </div>
  )
}