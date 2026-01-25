import { useParams, useNavigate } from 'react-router-dom'
import { TutorForm } from '../components/TutorForm'
import { PetPhotoInput } from '../../pets/components/PetPhotoInput'
import { tutorsFacade } from '../facade/tutors.facade'
import { useTutorDetails } from '../facade/useTutorDetails'
import type { CreateTutorInput } from '../../../shared/api/tutors.service'

export default function TutorEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const tutorId = Number(id)

  const { tutor, loading } = useTutorDetails(tutorId)

  async function handleSubmit(data: CreateTutorInput) {
    await tutorsFacade.updateTutor(tutorId, data)
    navigate('/tutors')
  }

  async function handlePhotoSelect(file: File) {
    await tutorsFacade.uploadPhoto(tutorId, file)
  }

  if (loading || !tutor) {
    return <p className="text-center mt-8">Carregando...</p>
  }

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-4">
      <h1 className="text-xl font-semibold">Editar Tutor</h1>

      <PetPhotoInput
        initialUrl={tutor.foto?.url ?? null}
        onSelect={handlePhotoSelect}
      />

      <TutorForm
        initialValues={{
          nome: tutor.nome,
          email: tutor.email,
          telefone: tutor.telefone,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}