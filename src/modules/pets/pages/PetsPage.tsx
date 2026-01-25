import { Link } from 'react-router-dom'
import { usePets } from '../modules/pets/facade/usePets'
import { petsFacade } from '../modules/pets/facade/pets.facade'



export default function PetsPage() {
  const { items, loading } = usePets(1, '')

  async function handleDelete(id: number) {
    const confirmed = window.confirm('Deseja realmente excluir este pet?')
    if (!confirmed) return

    await petsFacade.deletePet(id)
  }

  if (loading) {
    return <p className="text-center mt-8">Carregando...</p>
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">Pets</h1>

      <ul className="space-y-2">
        {items.map((pet) => (
          <li
            key={pet.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{pet.nome}</span>

            <div className="flex gap-2">
              <Link
                to={`/pets/${pet.id}/editar`}
                className="text-blue-600"
              >
                Editar
              </Link>

              <button
                onClick={() => handleDelete(pet.id)}
                className="text-red-600"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}