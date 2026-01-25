import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

    navigate('/tutores')
  }

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-4">
      <h1 className="text-xl font-semibold">Cadastrar Tutor</h1>

      <PetPhotoInput onSelect={setPhoto} />

      <TutorForm onSubmit={handleSubmit} />
    </div>
  )
}