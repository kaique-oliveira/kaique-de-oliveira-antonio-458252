import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './shared/auth/ProtectedRoute'
import { Layout } from './shared/components/Layout'

const PetsPage = lazy(() => import('./pages/PetsPage'))
const TutorsPage = lazy(() => import('./pages/TutorsPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const PetDetailsPage = lazy(() => import('./pages/PetDetailsPage'))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/pets" />} />
              <Route path="/pets" element={<PetsPage />} />
              <Route path="/pets/:id" element={<PetDetailsPage />} />
              <Route path="/tutors" element={<TutorsPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}