import { useEffect, useState } from 'react'
import { petsFacade } from './pets.facade'
import type { PetsState } from './pets.facade'

export function usePets(page: number, search: string) {
  const [state, setState] = useState<PetsState>({
    items: [],
    loading: false,
  })

  useEffect(() => {
    const sub = petsFacade.pets$.subscribe(setState)
    petsFacade.load(page, search)

    return () => sub.unsubscribe()
  }, [page, search])

  return state
}