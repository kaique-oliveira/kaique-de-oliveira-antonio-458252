import { useNavigate } from 'react-router-dom'
import { TutorForm } from '../components/TutorForm'
import { tutorsFacade } from '../facade/tutors.facade'
import type { CreateTutorInput } from '../../../shared/api/tutors.service'

export default function TutorCreatePage() {
  const navigate = useNavigate()

  async function handleSubmit(data: CreateTutorInput) {
    await tutorsFacade.createTutor(data)
    navigate('/tutores')
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">
        Cadastrar Tutor
      </h1>

      <TutorForm onSubmit={handleSubmit} />
    </div>
  )
}