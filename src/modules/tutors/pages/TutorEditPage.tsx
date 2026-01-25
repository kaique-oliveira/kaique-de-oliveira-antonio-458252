import { useParams, useNavigate } from 'react-router-dom'
import { TutorForm } from '../components/TutorForm'
import { tutorsFacade } from '../facade/tutors.facade'
import type { CreateTutorInput } from '../../../shared/api/tutors.service'
import { useTutorDetails } from '../facade/useTutorDetails'

export default function TutorEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const tutorId = Number(id)

  const { tutor, loading } = useTutorDetails(tutorId)

  async function handleSubmit(data: CreateTutorInput) {
    await tutorsFacade.updateTutor(tutorId, data)
    navigate('/tutores')
  }

  if (loading || !tutor) {
    return <p className="text-center mt-8">Carregando...</p>
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">
        Editar Tutor
      </h1>

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