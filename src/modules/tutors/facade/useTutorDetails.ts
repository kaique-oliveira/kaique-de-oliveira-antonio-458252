import { useEffect, useState } from 'react'
import { tutorDetailsFacade } from './tutor-details.facade'
import type { Tutor } from '../../../shared/api/tutors.service'

type TutorDetailsState = {
  tutor: Tutor | null
  loading: boolean
}

export function useTutorDetails(id: number) {
  const [state, setState] = useState<TutorDetailsState>({
    tutor: null,
    loading: false,
  })

  useEffect(() => {
    const sub = tutorDetailsFacade.tutor$.subscribe(setState)
    tutorDetailsFacade.load(id)

    return () => sub.unsubscribe()
  }, [id])

  return state
}