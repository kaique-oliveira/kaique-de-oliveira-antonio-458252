import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Edit, Trash2, UserPlus, Search } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTutors } from '../facade/useTutors'
import { tutorsFacade } from '../facade/tutors.facade'
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog'

export default function TutorsPage() {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { items, loading } = useTutors(page, search)

  const [deleteId, setDeleteId] = useState<number | null>(null)

  async function confirmDelete() {
    if (!deleteId) return

    try {
      await tutorsFacade.deleteTutor(deleteId)
      toast.success('Tutor excluído com sucesso')
    } catch {
      toast.error('Erro ao excluir tutor')
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Tutores</h1>

        <Link
          to="/tutors/novo"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer"
        >
          <UserPlus size={16} />
          Novo Tutor
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
          placeholder="Buscar tutor pelo nome"
          className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center mt-24">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-green-500"
          >
            <User size={36} />
          </motion.div>
        </div>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
          <User size={44} className="mb-4 text-green-300" />
          <p>Nenhum tutor encontrado</p>
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
            onClick={() => navigate(`/tutors/${tutor.id}`)}
            className="relative bg-white rounded-3xl shadow-sm hover:shadow-lg transition pt-16 cursor-pointer"
          >
            {/* Avatar */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none">
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
            </div>

            {/* Content */}
            <div className="px-6 pb-5 text-center space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">{tutor.nome}</h2>

              {/* Actions */}
              <div className="flex justify-center gap-6 pt-4" onClick={(e) => e.stopPropagation()}>
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

      {/* Pagination */}
      <div className="flex justify-center gap-3 pt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition cursor-pointer"
        >
          Anterior
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition cursor-pointer"
        >
          Próxima
        </button>
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
