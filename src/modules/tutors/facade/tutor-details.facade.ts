import { BehaviorSubject } from 'rxjs'
import { tutorsService } from '../../../shared/api/tutors.service'
import type { Tutor } from '../../../shared/api/tutors.service'

type TutorDetailsState = {
  tutor: Tutor | null
  loading: boolean
}

class TutorDetailsFacade {
  private state$ = new BehaviorSubject<TutorDetailsState>({
    tutor: null,
    loading: false,
  })

  readonly tutor$ = this.state$.asObservable()

  async load(id: number) {
    this.state$.next({ tutor: null, loading: true })

    const { data } = await tutorsService.getById(id)

    this.state$.next({
      tutor: data,
      loading: false,
    })
  }
}

export const tutorDetailsFacade = new TutorDetailsFacade()