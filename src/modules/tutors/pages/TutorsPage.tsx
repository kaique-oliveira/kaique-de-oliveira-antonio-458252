import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Edit, Trash2, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useTutors } from '../facade/useTutors'
import { tutorsFacade } from '../facade/tutors.facade'
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog'

export default function TutorsPage() {
  const { items, loading } = useTutors(1, '')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  async function confirmDelete() {
    if (!deleteId) return
    await tutorsFacade.deleteTutor(deleteId)
    setDeleteId(null)
  }

  if (loading) {
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">Tutores</h1>

        <Link
          to="/tutors/novo"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer"
        >
          <UserPlus size={16} />
          Novo Tutor
        </Link>
      </div>

      {/* Empty */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
          <User size={44} className="mb-4 text-green-300" />
          <p>Nenhum tutor cadastrado</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {items.map((tutor) => (
          <motion.div
            key={tutor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-3xl shadow-sm hover:shadow-lg transition pt-16"
          >
            {/* Avatar */}
            <Link to={`/tutors/${tutor.id}`} className="absolute -top-10 left-1/2 -translate-x-1/2 cursor-pointer">
              {tutor.foto?.url ? (
                <img
                  src={tutor.foto.url}
                  alt={tutor.nome}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-green-100 border-4 border-white shadow-md flex items-center justify-center text-green-600 text-xl font-semibold">
                  {tutor.nome.charAt(0)}
                </div>
              )}
            </Link>

            {/* Content */}
            <div className="px-6 pb-5 text-center space-y-2">
              <Link
                to={`/tutors/${tutor.id}`}
                className="block text-lg font-semibold text-gray-800 hover:text-green-600 transition cursor-pointer"
              >
                {tutor.nome}
              </Link>

              {/* Actions */}
              <div className="flex justify-center gap-6 pt-4">
                <Link
                  to={`/tutors/${tutor.id}/editar`}
                  className="text-blue-400 hover:text-blue-300 transition cursor-pointer"
                >
                  <Edit size={18} />
                </Link>

                <button
                  onClick={() => setDeleteId(tutor.id)}
                  className="text-red-400 hover:text-red-300 transition cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dialog */}
      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Excluir tutor"
        description="Esta ação não poderá ser desfeita."
        confirmText="Excluir"
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
