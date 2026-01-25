import { BehaviorSubject } from 'rxjs'
import { petsService } from '../../../shared/api/pets.service'
import type { Pet, CreatePetInput } from '../../../shared/api/pets.service'

export type PetsState = {
  items: Pet[]
  loading: boolean
}

const state$ = new BehaviorSubject<PetsState>({
  items: [],
  loading: false,
})

async function load(page = 1, search = '') {
  state$.next({ ...state$.value, loading: true })

  const { data } = await petsService.list({
    page,
    size: 10,
    nome: search,
  })

  state$.next({
    items: data.content,
    loading: false,
  })
}

async function createPet(data: CreatePetInput) {
  await petsService.create(data)
  await load()
}

async function updatePet(id: number, data: CreatePetInput) {
  await petsService.update(id, data)
  await load()
}

async function deletePet(id: number) {
  await petsService.remove(id)
  await load()
}

export const petsFacade = {
  pets$: state$.asObservable(),
  load,
  createPet,
  updatePet,
  deletePet,
}