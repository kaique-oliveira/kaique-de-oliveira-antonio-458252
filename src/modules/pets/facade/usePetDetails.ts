import { useEffect, useState } from 'react'
import { petDetailsFacade } from './pet-details.facade'
import type { Pet } from '../../../shared/api/pets.service'

type PetDetailsState = {
  pet: Pet | null
  loading: boolean
}

export function usePetDetails(id: number) {
  const [state, setState] = useState<PetDetailsState>({
    pet: null,
    loading: false,
  })

  useEffect(() => {
    const sub = petDetailsFacade.pet$.subscribe(setState)
    petDetailsFacade.load(id)
    return () => sub.unsubscribe()
  }, [id])

  return state
}