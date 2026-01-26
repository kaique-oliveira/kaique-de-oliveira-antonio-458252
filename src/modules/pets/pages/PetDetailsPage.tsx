import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { PawPrint, UserPlus, Trash2, ArrowLeft, Edit2 } from 'lucide-react'
import { usePetDetails } from '../facade/usePetDetails'
import { petDetailsFacade } from '../facade/pet-details.facade'
import { petsFacade } from '../facade/pets.facade'
import { useTutors } from '../../tutors/facade/useTutors'
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog'
import toast from 'react-hot-toast'

export default function PetDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const petId = Number(id)
  const navigate = useNavigate()

  const { pet, loading } = usePetDetails(petId)
  const { items: tutors } = useTutors(1, '')
  const [selectedTutor, setSelectedTutor] = useState<number | ''>('')

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  async function handleConfirmDelete() {
    try {
      await petsFacade.deletePet(petId)
      toast.success('Pet excluído com sucesso')
      navigate('/pets')
    } catch {
      toast.error('Erro ao excluir o pet')
    }
  }

  if (loading || !pet) {
    return (
      <div className="flex justify-center items-center mt-24">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-green-500">
          <PawPrint size={36} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      {/* Pet Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm pt-20 pb-6 px-6 text-center relative group"
      >
        {/* Actions (hover) */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => navigate(`/pets/${petId}/editar`)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
            title="Editar pet"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => setOpenDeleteDialog(true)}
            className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 cursor-pointer"
            title="Excluir pet"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Avatar */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          {pet.foto?.url ? (
            <img
              src={pet.foto.url}
              alt={pet.nome}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md bg-white"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-green-100 border-4 border-white shadow-md flex items-center justify-center text-green-500">
              <PawPrint size={36} />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">{pet.nome}</h1>

        <p className="text-gray-500 mt-1">
          {pet.raca}
          {pet.idade !== null && ` • ${pet.idade} anos`}
        </p>
      </motion.div>

      {/* Vincular tutor */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Vincular tutor</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="flex-1 border border-gray-200 rounded-xl px-4 pr-10 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-green-200 bg-white"
            value={selectedTutor}
            onChange={(e) => setSelectedTutor(Number(e.target.value))}
          >
            <option value="">Selecione um tutor</option>
            {tutors.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.nome}
              </option>
            ))}
          </select>

          <button
            disabled={!selectedTutor}
            onClick={async () => {
              try {
                await petDetailsFacade.addTutor(petId, Number(selectedTutor))
                toast.success('Tutor vinculado com sucesso')
                setSelectedTutor('')
              } catch {
                toast.error('Erro ao vincular tutor')
              }
            }}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-50 text-white px-6 py-2 rounded-xl transition cursor-pointer"
          >
            <UserPlus size={16} />
            Vincular
          </button>
        </div>
      </div>

      {/* Tutores vinculados */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Tutores vinculados</h2>

        {pet.tutores?.length ? (
          <ul className="space-y-3">
            {pet.tutores.map((tutor) => (
              <li
                key={tutor.id}
                onClick={() => navigate(`/tutors/${tutor.id}`)}
                className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {tutor.foto?.url ? (
                    <img src={tutor.foto.url} alt={tutor.nome} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                      {tutor.nome.charAt(0)}
                    </div>
                  )}

                  <span className="font-medium text-gray-700">{tutor.nome}</span>
                </div>

                <button
                  onClick={async (e) => {
                    e.stopPropagation()
                    try {
                      await petDetailsFacade.removeTutor(petId, tutor.id)
                      toast.success('Tutor desvinculado')
                    } catch {
                      toast.error('Erro ao remover tutor')
                    }
                  }}
                  className="text-red-400 hover:text-red-300 transition cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Nenhum tutor vinculado</p>
        )}
      </div>

      <ConfirmDialog
        open={openDeleteDialog}
        title="Excluir pet"
        description="Essa ação não pode ser desfeita. Deseja realmente excluir este pet?"
        confirmText="Excluir"
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
