import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { TutorForm } from '../components/TutorForm'
import { PetPhotoInput } from '../../pets/components/PetPhotoInput'
import { tutorsFacade } from '../facade/tutors.facade'
import type { CreateTutorInput } from '../../../shared/api/tutors.service'

export default function TutorCreatePage() {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState<File | null>(null)

  async function handleSubmit(data: CreateTutorInput) {
    const tutor = await tutorsFacade.createTutor(data)

    if (photo) {
      await tutorsFacade.uploadPhoto(tutor.id, photo)
    }

    navigate('/tutors')
  }

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/tutors')}
          className="flex items-center text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">Cadastrar Tutor</h1>
      </div>

      {/* Foto */}
      <PetPhotoInput onSelect={setPhoto} />

      {/* Form */}
      <TutorForm onSubmit={handleSubmit} />
    </div>
  )
}
