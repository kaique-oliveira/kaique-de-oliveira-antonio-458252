import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit, Trash2, PawPrint, Search } from 'lucide-react'
import { useState } from 'react'
import { petsFacade } from '../facade/pets.facade'
import { usePets } from '../facade/usePets'
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog'

export default function PetsPage() {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { items, loading } = usePets(page, search)

  const [openDeleteDialog, setOpenDeleteDialog] = useState<{
    open: boolean
    petId: number
  }>({ open: false, petId: 0 })

  async function handleConfirmDelete() {
    await petsFacade.deletePet(openDeleteDialog.petId)
    setOpenDeleteDialog({ open: false, petId: 0 })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-14">
      {/* Header */}
      <div className="flex  sm:flex-row gap-4 sm:items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Pets</h1>

        <Link
          to="/pets/novo"
          className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer"
        >
          Novo Pet
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
          placeholder="Buscar pet pelo nome"
          className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center mt-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-green-500"
          >
            <PawPrint size={36} />
          </motion.div>
        </div>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
          <PawPrint size={44} className="mb-4 text-green-300" />
          <p>Nenhum pet encontrado</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {items.map((pet) => (
          <motion.div
            key={pet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(`/pets/${pet.id}`)}
            className="relative bg-white rounded-3xl shadow-sm hover:shadow-lg transition pt-16 cursor-pointer"
          >
            {/* Avatar */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none">
              {pet.foto?.url ? (
                <img
                  src={pet.foto.url}
                  alt={pet.nome}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-green-100 border-4 border-white shadow-md flex items-center justify-center text-green-500">
                  <PawPrint size={32} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="px-6 pb-5 text-center space-y-2">
              <h2 className="text-lg font-semibold text-gray-800">{pet.nome}</h2>

              <p className="text-sm text-gray-500">
                {pet.raca}
                {pet.idade !== null && ` • ${pet.idade} anos`}
              </p>

              {/* Actions */}
              <div className="flex justify-center gap-6 pt-4" onClick={(e) => e.stopPropagation()}>
                <Link
                  to={`/pets/${pet.id}/editar`}
                  className="text-blue-400 hover:text-blue-300 transition cursor-pointer"
                >
                  <Edit size={18} />
                </Link>

                <button
                  onClick={() =>
                    setOpenDeleteDialog({
                      open: true,
                      petId: pet.id,
                    })
                  }
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
        open={openDeleteDialog.open}
        title="Excluir pet"
        description="Essa ação não pode ser desfeita. Deseja realmente excluir este pet?"
        confirmText="Excluir"
        onCancel={() => setOpenDeleteDialog({ open: false, petId: 0 })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
