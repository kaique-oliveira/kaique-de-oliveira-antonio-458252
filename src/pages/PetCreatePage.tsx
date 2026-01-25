import { useNavigate } from 'react-router-dom'
import { petsFacade } from '../modules/pets/facade/pets.facade'
import { PetForm } from '../modules/pets/components/PetForm'


export default function PetCreatePage() {
  const navigate = useNavigate()

  async function handleSubmit(data: {
    nome: string
    raca: string
    idade: number | null
  }) {
    await petsFacade.createPet(data)
    navigate('/pets')
  }

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-xl font-semibold mb-4">
        Cadastrar Pet
      </h1>

      <PetForm onSubmit={handleSubmit} />
    </div>
  )
}