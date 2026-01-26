import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import type { CreatePetInput } from '../../../shared/api/pets.service'
import { petsFacade } from '../facade/pets.facade'
import { PetPhotoInput } from '../components/PetPhotoInput'
import { PetForm } from '../components/PetForm'

export default function PetCreatePage() {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(data: CreatePetInput) {
    try {
      setLoading(true)

      const pet = await petsFacade.createPet(data)

      if (photo) {
        await petsFacade.uploadPhoto(pet.id, photo)
      }

      toast.success('Pet cadastrado com sucesso 🐾')
      navigate('/pets')
    } catch (error) {
      toast.error('Erro ao cadastrar pet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">Cadastrar Pet</h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-sm p-6 space-y-6">
        {/* Foto */}
        <div className="flex justify-center">
          <PetPhotoInput onSelect={setPhoto} />
        </div>

        {/* Form */}
        <PetForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}
