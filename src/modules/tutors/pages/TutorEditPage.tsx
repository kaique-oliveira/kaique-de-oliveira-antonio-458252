import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
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
    try {
      await tutorsFacade.updateTutor(tutorId, data)
      toast.success('Tutor atualizado com sucesso')
      navigate('/tutors')
    } catch {
      toast.error('Erro ao atualizar tutor')
    }
  }

  async function handlePhotoSelect(file: File) {
    try {
      await tutorsFacade.uploadPhoto(tutorId, file)
      toast.success('Foto atualizada com sucesso')
    } catch {
      toast.error('Erro ao atualizar foto')
    }
  }

  if (loading || !tutor) {
    return <p className="text-center mt-8 text-gray-500">Carregando...</p>
  }

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/tutors')}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">Editar Tutor</h1>
      </div>

      {/* Foto */}
      <PetPhotoInput initialUrl={tutor.foto?.url ?? null} onSelect={handlePhotoSelect} />

      {/* Form */}
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
