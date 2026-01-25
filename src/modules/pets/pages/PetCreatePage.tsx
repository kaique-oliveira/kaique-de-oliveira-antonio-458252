import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CreatePetInput } from '../shared/api/pets.service'
import { petsFacade } from '../modules/pets/facade/pets.facade'
import { PetPhotoInput } from '../modules/pets/components/PetPhotoInput'
import { PetForm } from '../modules/pets/components/PetForm'


export default function PetCreatePage() {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState<File | null>(null)

  async function handleSubmit(data: CreatePetInput) {
    const pet = await petsFacade.createPet(data)

    if (photo) {
      await petsFacade.uploadPhoto(pet.id, photo)
    }

    navigate('/pets')
  }

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-4">
      <h1 className="text-xl font-semibold">
        Cadastrar Pet
      </h1>

      <PetPhotoInput onSelect={setPhoto} />

      <PetForm onSubmit={handleSubmit} />
    </div>
  )
}