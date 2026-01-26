import { BehaviorSubject } from 'rxjs'
import { tutorsService } from '../../../shared/api/tutors.service'
import type { Tutor, CreateTutorInput } from '../../../shared/api/tutors.service'

export type TutorsState = {
  items: Tutor[]
  loading: boolean
}

const state$ = new BehaviorSubject<TutorsState>({
  items: [],
  loading: false,
})

async function load(page = 1, search = '') {
  state$.next({ ...state$.value, loading: true })

  const { data } = await tutorsService.list({
    page,
    size: 10,
    nome: search,
  })

  state$.next({
    items: data.content,
    loading: false,
  })
}

async function createTutor(data: CreateTutorInput) {
  const { data: tutor } = await tutorsService.create(data)
  await load()
  return tutor
}

async function updateTutor(id: number, data: CreateTutorInput) {
  await tutorsService.update(id, data)
  await load()
}

async function deleteTutor(id: number) {
  await tutorsService.remove(id)
  await load()
}

async function uploadPhoto(tutorId: number, file: File) {
  await tutorsService.uploadPhoto(tutorId, file)
  await load()
}

export const tutorsFacade = {
  tutors$: state$.asObservable(),
  load,
  createTutor,
  updateTutor,
  deleteTutor,
  uploadPhoto,
}
