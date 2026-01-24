import { BehaviorSubject } from 'rxjs'
import { getPetById, type Pet } from '../../../shared/api/pets.service'

type PetDetailsState = {
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

    const pet = await getPetById(id)

    this.state$.next({
      pet,
      loading: false,
    })
  }
}

export const petDetailsFacade = new PetDetailsFacade()