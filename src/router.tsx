import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const PetsPage = lazy(() => import('./pages/PetsPage'))
const TutorsPage = lazy(() => import('./pages/TutorsPage'))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/pets" />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/tutors" element={<TutorsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}