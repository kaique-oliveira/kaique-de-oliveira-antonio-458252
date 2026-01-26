import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, PawPrint, User } from 'lucide-react'
import { useTutorDetails } from '../facade/useTutorDetails'

export default function TutorDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const tutorId = Number(id)
  const navigate = useNavigate()

  const { tutor, loading } = useTutorDetails(tutorId)

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
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/tutors')}
          className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">Detalhes do Tutor</h1>
      </div>

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
          {tutor.email && <p>{tutor.email}</p>}
          {tutor.telefone && <p>{tutor.telefone}</p>}
        </div>
      </motion.div>
    </div>
  )
}
