import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './shared/auth/ProtectedRoute'
import { Layout } from './shared/components/Layout'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const HealthPage = lazy(() => import('./pages/HealthPage'))

const PetsPage = lazy(() => import('./modules/pets/pages/PetsPage'))
const PetCreatePage = lazy(() => import('./modules/pets/pages/PetCreatePage'))
const PetEditPage = lazy(() => import('./modules/pets/pages/PetEditPage'))
const PetDetailsPage = lazy(() => import('./modules/pets/pages/PetDetailsPage'))

const TutorsPage = lazy(() => import('./modules/tutors/pages/TutorsPage'))
const TutorCreatePage = lazy(() => import('./modules/tutors/pages/TutorCreatePage'))
const TutorEditPage = lazy(() => import('./modules/tutors/pages/TutorEditPage'))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/health" element={<HealthPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/pets" />} />

              <Route path="/pets" element={<PetsPage />} />
              <Route path="/pets/novo" element={<PetCreatePage />} />
              <Route path="/pets/:id" element={<PetDetailsPage />} />
              <Route path="/pets/:id/editar" element={<PetEditPage />} />

              <Route path="/tutores" element={<TutorsPage />} />
              <Route path="/tutores/novo" element={<TutorCreatePage />} />
              <Route path="/tutores/:id/editar" element={<TutorEditPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}