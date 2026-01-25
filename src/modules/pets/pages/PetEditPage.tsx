import { useParams, useNavigate } from 'react-router-dom'
import { usePetDetails } from '../facade/usePetDetails'
import type { CreatePetInput } from '../../../shared/api/pets.service'
import { petsFacade } from '../facade/pets.facade'
import { PetPhotoInput } from '../components/PetPhotoInput'
import { PetForm } from '../components/PetForm'



export default function PetEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const petId = Number(id)
  const { pet, loading } = usePetDetails(petId)

  async function handleSubmit(data: CreatePetInput) {
    await petsFacade.updatePet(petId, data)
    navigate('/pets')
  }

  async function handlePhotoSelect(file: File) {
    await petsFacade.uploadPhoto(petId, file)
  }

  if (loading || !pet) {
    return <p className="text-center mt-8">Carregando...</p>
  }

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-4">
      <h1 className="text-xl font-semibold">
        Editar Pet
      </h1>

      <PetPhotoInput
        initialUrl={pet.foto?.url ?? null}
        onSelect={handlePhotoSelect}
      />

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