import { BehaviorSubject } from 'rxjs'
import { petsService } from '../../../shared/api/pets.service'
import type { Pet } from '../../../shared/api/pets.service'

export type PetDetailsState = {
  pet: Pet | null
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

    const { data: pet } = await petsService.getById(id)

    this.state$.next({
      pet,
      loading: false,
    })
  }
}

export const petDetailsFacade = new PetDetailsFacade()