import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit, Trash2, PawPrint } from 'lucide-react'
import { petsFacade } from '../facade/pets.facade'
import { usePets } from '../facade/usePets'
import { useState } from 'react'
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog'

export default function PetsPage() {
  const { items, loading } = usePets(1, '')
  const navigate = useNavigate()

  const [openDeleteDialog, setOpenDeleteDialog] = useState({ open: false, petId: 0 })

  async function handleConfirmDelete() {
    await petsFacade.deletePet(openDeleteDialog.petId)
    navigate('/pets')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-24">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-green-500">
          <PawPrint size={36} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">Pets</h1>

        <Link
          to="/pets/novo"
          className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium transition"
        >
          Novo Pet
        </Link>
      </div>

      {/* Empty */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
          <PawPrint size={44} className="mb-4 text-green-300" />
          <p>Nenhum pet cadastrado</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {items.map((pet) => (
          <motion.div
            key={pet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -0.5 }}
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
              <div className="flex justify-center gap-6 pt-4 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                <Link to={`/pets/${pet.id}/editar`} className="text-blue-400 hover:text-blue-300 transition">
                  <Edit size={18} />
                </Link>

                <button
                  onClick={() => setOpenDeleteDialog({ open: true, petId: pet.id })}
                  className="text-red-400 hover:text-red-300 transition cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
