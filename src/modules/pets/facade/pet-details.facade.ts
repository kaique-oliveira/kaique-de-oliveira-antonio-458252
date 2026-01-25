import { BehaviorSubject } from 'rxjs'
import { petsService } from '../../../shared/api/pets.service'
import type { Pet } from '../../../shared/api/pets.service'
import type { Tutor } from '../../../shared/api/tutors.service'


export type PetDetailsState = {
  pet: (Pet & { tutores?: Tutor[] }) | null
  loading: boolean
}

class PetDetailsFacade {
  private state$ = new BehaviorSubject<PetDetailsState>({
    pet: null,
    loading: false,
  })

  readonly pet$ = this.state$.asObservable()

  async load(id: number) {
    this.state$.next({ pet: null, loading: true })
    const { data } = await petsService.getById(id)
    this.state$.next({ pet: data, loading: false })
  }

  async addTutor(petId: number, tutorId: number) {
    await petsService.addTutor(petId, tutorId)
    await this.load(petId)
  }

  async removeTutor(petId: number, tutorId: number) {
    await petsService.removeTutor(petId, tutorId)
    await this.load(petId)
  }
}

export const petDetailsFacade = new PetDetailsFacade()