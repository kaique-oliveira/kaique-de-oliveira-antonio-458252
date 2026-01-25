import { useParams } from 'react-router-dom'
import { usePetDetails } from '../facade/usePetDetails'
import { petDetailsFacade } from '../facade/pet-details.facade'
import { useTutors } from '../../tutors/facade/useTutors'
import { useState } from 'react'

export default function PetDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const petId = Number(id)

  const { pet, loading } = usePetDetails(petId)
  const { items: tutors } = useTutors(1, '')
  const [selectedTutor, setSelectedTutor] = useState<number | ''>('')

  if (loading || !pet) {
    return <p className="text-center mt-8">Carregando...</p>
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-4">
      <h1 className="text-xl font-semibold">{pet.nome}</h1>

      <div className="flex gap-2">
        <select
          className="border p-2"
          value={selectedTutor}
          onChange={(e) => setSelectedTutor(Number(e.target.value))}
        >
          <option value="">Selecione um tutor</option>
          {tutors.map((tutor) => (
            <option key={tutor.id} value={tutor.id}>
              {tutor.nome}
            </option>
          ))}
        </select>

        <button
          className="bg-slate-900 text-white px-4"
          disabled={!selectedTutor}
          onClick={() =>
            petDetailsFacade.addTutor(petId, Number(selectedTutor))
          }
        >
          Vincular
        </button>
      </div>

      {/* Tutores vinculados */}
      <div>
        <h2 className="font-medium">Tutores vinculados</h2>

        {pet.tutores?.length ? (
          <ul className="space-y-2">
            {pet.tutores.map((tutor) => (
              <li
                key={tutor.id}
                className="flex justify-between border p-2 rounded"
              >
                <span>{tutor.nome}</span>

                <button
                  className="text-red-600"
                  onClick={() =>
                    petDetailsFacade.removeTutor(petId, tutor.id)
                  }
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            Nenhum tutor vinculado
          </p>
        )}
      </div>
    </div>
  )
}