import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, PawPrint } from 'lucide-react'
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
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          Voltar
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

      {/* Pets vinculados */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Pets vinculados</h3>

        {tutor.pets && tutor.pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutor.pets.map((pet) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <Link to={`/pets/${pet.id}`} className="block p-4 text-center space-y-3">
                  {/* Pet avatar */}
                  <div className="flex justify-center">
                    {pet.foto?.url ? (
                      <img
                        src={pet.foto.url}
                        alt={pet.nome}
                        className="w-20 h-20 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <PawPrint size={28} />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">{pet.nome}</p>
                    <p className="text-sm text-gray-500">
                      {pet.raca}
                      {pet.idade !== null && ` • ${pet.idade} anos`}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <PawPrint size={40} className="mb-3 text-green-300" />
            <p>Nenhum pet vinculado a este tutor</p>
          </div>
        )}
      </div>
    </div>
  )
}
