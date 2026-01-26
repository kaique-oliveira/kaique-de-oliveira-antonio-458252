import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
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
    return (
      <p className="text-center mt-20 text-gray-500">
        Carregando...
      </p>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Editar Pet
        </h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-sm p-6 space-y-6">
        {/* Foto */}
        <div className="flex justify-center">
          <PetPhotoInput
            initialUrl={pet.foto?.url ?? null}
            onSelect={handlePhotoSelect}
          />
        </div>

        {/* Form */}
        <PetForm
          initialValues={{
            nome: pet.nome,
            raca: pet.raca,
            idade: pet.idade,
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}