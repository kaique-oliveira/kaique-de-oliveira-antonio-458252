import { Link, useParams } from 'react-router-dom'
import { usePetDetails } from '../facade/usePetDetails'

export default function PetDetailsPage() {
  const { id } = useParams()
  const { pet, loading } = usePetDetails(Number(id))

  if (loading) return <p>Carregando...</p>
  if (!pet) return null

  return (
    <div className="space-y-4">
      <Link to="/pets" className="underline">← Voltar</Link>

      {pet.foto?.url && (
        <img src={pet.foto.url} className="w-64 rounded" />
      )}

      <h1 className="text-xl font-bold">{pet.nome}</h1>
      <p><b>Raça:</b> {pet.raca}</p>
      <p><b>Idade:</b> {pet.idade ?? 'Não informado'}</p>
      
    </div>
  )
}