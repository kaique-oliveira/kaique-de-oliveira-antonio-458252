import { useEffect, useState } from 'react'
import { petDetailsFacade, type PetDetailsState } from './pet-details.facade'

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