import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
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
  const [saving, setSaving] = useState(false)

  async function handleSubmit(data: CreatePetInput) {
    try {
      setSaving(true)

      await petsFacade.updatePet(petId, data)

      toast.success('Pet atualizado com sucesso 🐾')
      navigate('/pets')
    } catch {
      toast.error('Erro ao atualizar o pet')
    } finally {
      setSaving(false)
    }
  }

  async function handlePhotoSelect(file: File) {
    try {
      await petsFacade.uploadPhoto(petId, file)
      toast.success('Foto atualizada com sucesso')
    } catch {
      toast.error('Erro ao atualizar a foto')
    }
  }

  if (loading || !pet) {
    return <p className="text-center mt-20 text-gray-500">Carregando...</p>
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">Editar Pet</h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-sm p-6 space-y-6">
        {/* Foto */}
        <div className="flex justify-center">
          <PetPhotoInput initialUrl={pet.foto?.url ?? null} onSelect={handlePhotoSelect} />
        </div>

        {/* Form */}
        <PetForm
          initialValues={{
            nome: pet.nome,
            raca: pet.raca,
            idade: pet.idade,
          }}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </div>
    </div>
  )
}
