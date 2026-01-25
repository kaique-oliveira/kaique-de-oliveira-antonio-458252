import { Link } from 'react-router-dom'
import { useTutors } from '../facade/useTutors'
import { tutorsFacade } from '../facade/tutors.facade'

export default function TutorsPage() {
  const { items, loading } = useTutors(1, '')

  async function handleDelete(id: number) {
    const ok = window.confirm('Deseja excluir este tutor?')
    if (!ok) return
    await tutorsFacade.deleteTutor(id)
  }

  if (loading) {
    return <p className="text-center mt-8">Carregando...</p>
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Tutores</h1>

        <Link
          to="/tutors/novo"
          className="bg-slate-900 text-white px-4 py-2 rounded"
        >
          Novo Tutor
        </Link>
      </div>

      <ul className="space-y-2">
        {items.map((tutor) => (
          <li
            key={tutor.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{tutor.nome}</span>

            <div className="flex gap-2">
              <Link
                to={`/tutors/${tutor.id}/editar`}
                className="text-blue-600"
              >
                Editar
              </Link>

              <button
                onClick={() => handleDelete(tutor.id)}
                className="text-red-600"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}