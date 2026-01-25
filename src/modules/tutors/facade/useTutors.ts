import { useEffect, useState } from 'react'
import { tutorsFacade } from './tutors.facade'
import type { TutorsState } from './tutors.facade'

export function useTutors(page: number, search: string) {
  const [state, setState] = useState<TutorsState>({
    items: [],
    loading: false,
  })

  useEffect(() => {
    const sub = tutorsFacade.tutors$.subscribe(setState)
    tutorsFacade.load(page, search)

    return () => sub.unsubscribe()
  }, [page, search])

  return state
}