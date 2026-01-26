import { motion } from 'framer-motion'
import { PawPrint } from 'lucide-react'

export function AppLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-green-500">
        <PawPrint size={40} />
      </motion.div>

      <p className="text-sm text-gray-500">Carregando...</p>
    </div>
  )
}
