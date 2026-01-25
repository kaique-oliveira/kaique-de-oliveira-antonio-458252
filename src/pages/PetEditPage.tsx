import { useParams, useNavigate } from 'react-router-dom'
import { usePetDetails } from '../modules/pets/facade/usePetDetails'
import type { CreatePetInput } from '../shared/api/pets.service'
import { petsFacade } from '../modules/pets/facade/pets.facade'
import { PetForm } from '../modules/pets/components/PetForm'


export default function PetEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const petId = Number(id)
  const { pet, loading } = usePetDetails(petId)

  async function handleSubmit(data: CreatePetInput) {
    await petsFacade.updatePet(petId, data)
    navigate('/pets')
  }

  if (loading || !pet) {
    return <p className="text-center mt-8">Carregando...</p>
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">
        Editar Pet
      </h1>

      <PetForm
        initialValues={{
          nome: pet.nome,
          raca: pet.raca,
          idade: pet.idade,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}