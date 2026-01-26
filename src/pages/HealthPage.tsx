import Lottie from 'lottie-react'
import animationData from '../shared/lottie/health.json'

export default function HealthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <Lottie animationData={animationData} loop className="w-100 h-100" />

      <h1 className="text-xl font-semibold text-gray-800">Serviço operacional</h1>

      <p className="text-sm text-gray-500">API e Front-end funcionando corretamente</p>
    </div>
  )
}
