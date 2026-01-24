import { BehaviorSubject } from 'rxjs'
import { listPets, type Pet } from '../../../shared/api/pets.service'

type PetsState = {
  items: Pet[]
  loading: boolean
}

class PetsFacade {
  private state$ = new BehaviorSubject<PetsState>({
    items: [],
    loading: false,
  })

  readonly pets$ = this.state$.asObservable()

  async load(page = 1, search = '') {
    this.state$.next({ ...this.state$.value, loading: true })

    const data = await listPets(page, search)

    this.state$.next({
      items: data.content,
      loading: false,
    })
  }
}

export const petsFacade = new PetsFacade()