import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPetById, type Pet } from '../shared/api/pets.service'

export default function PetDetailsPage() {
  const { id } = useParams()
  const [pet, setPet] = useState<Pet | null>(null)

  useEffect(() => {
    if (!id) return
    getPetById(Number(id)).then(setPet)
  }, [id])

  if (!pet) return <p>Carregando...</p>

  return (
    <div className="space-y-4">
      <Link to="/pets" className="underline">← Voltar</Link>

      {pet.foto?.url && (
        <img
          src={pet.foto.url}
          alt={pet.nome}
          className="w-64 rounded"
        />
      )}

      <h1 className="text-xl font-bold">{pet.nome}</h1>
      <p><b>Raça:</b> {pet.raca}</p>
      <p><b>Idade:</b> {pet.idade ?? 'Não informado'}</p>
    </div>
  )
}