import { useEffect, useState } from 'react'
import { petsFacade } from './pets.facade'
import type { Pet } from '../../../shared/api/pets.service'

type PetsState = {
  items: Pet[]
  loading: boolean
}

export function usePets(page: number, search: string) {
  const [state, setState] = useState<PetsState>({
    items: [],
    loading: false,
  })

  useEffect(() => {
    const sub = petsFacade.pets$.subscribe((value) => {
      setState(value)
    })

    petsFacade.load(page, search)

    return () => sub.unsubscribe()
  }, [page, search])

  return state
}