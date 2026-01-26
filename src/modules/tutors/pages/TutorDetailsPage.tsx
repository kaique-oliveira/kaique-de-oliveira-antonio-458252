import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Trash2, PawPrint } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTutorDetails } from '../facade/useTutorDetails'
import { tutorDetailsFacade } from '../facade/tutor-details.facade'

export default function TutorDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const tutorId = Number(id)
  const navigate = useNavigate()

  const { tutor, loading } = useTutorDetails(tutorId)

  async function handleUnlinkPet(petId: number) {
    try {
      await tutorDetailsFacade.removePet(tutorId, petId)
      toast.success('Pet desvinculado com sucesso')
    } catch {
      toast.error('Erro ao desvincular pet')
    }
  }

  if (loading || !tutor) {
    return (
      <div className="flex justify-center items-center mt-24">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-green-500"
        >
          <User size={36} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      {/* Tutor Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm pt-20 pb-6 px-6 text-center relative"
      >
        {/* Avatar */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          {tutor.foto?.url ? (
            <img
              src={tutor.foto.url}
              alt={tutor.nome}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md bg-white"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-green-100 border-4 border-white shadow-md flex items-center justify-center text-green-600">
              <User size={36} />
            </div>
          )}
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">{tutor.nome}</h2>

        <div className="mt-2 text-gray-500 text-sm space-y-1">
          <p>{tutor.email}</p>
          {tutor.telefone && <p>{tutor.telefone}</p>}
        </div>
      </motion.div>

      {/* Pets vinculados */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Pets vinculados</h3>

        {tutor.pets?.length ? (
          <ul className="space-y-3">
            {tutor.pets.map((pet) => (
              <li
                key={pet.id}
                className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  {pet.foto?.url ? (
                    <img src={pet.foto.url} alt={pet.nome} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <PawPrint size={18} />
                    </div>
                  )}

                  <div>
                    <p className="font-medium text-gray-700">{pet.nome}</p>
                    <p className="text-xs text-gray-500">{pet.raca}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleUnlinkPet(pet.id)}
                  className="text-red-400 hover:text-red-300 transition cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Nenhum pet vinculado</p>
        )}
      </div>
    </div>
  )
}
