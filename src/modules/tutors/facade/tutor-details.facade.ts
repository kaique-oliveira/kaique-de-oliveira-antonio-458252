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

  async removePet(tutorId: number, petId: number) {
    this.state$.next({
      ...this.state$.value,
      loading: true,
    })

    await tutorsService.removePet(tutorId, petId)

    await this.load(tutorId)
  }
}

export const tutorDetailsFacade = new TutorDetailsFacade()
