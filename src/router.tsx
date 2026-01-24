import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from './shared/components/Layout'

const PetsPage = lazy(() => import('./pages/PetsPage'))
const TutorsPage = lazy(() => import('./pages/TutorsPage'))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/pets" />} />
            <Route path="/pets" element={<PetsPage />} />
            <Route path="/tutors" element={<TutorsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}