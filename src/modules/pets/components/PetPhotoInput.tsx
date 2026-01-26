import { useRef, useState } from 'react'
import { Camera, PawPrint } from 'lucide-react'

type Props = {
  onSelect: (file: File) => void
  initialUrl?: string | null
}

export function PetPhotoInput({ onSelect, initialUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(
    initialUrl ?? null
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    onSelect(file)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative w-32 h-32 rounded-full border-4 border-white shadow-md bg-gray-50 hover:opacity-90 transition cursor-pointer overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="Foto do pet"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-green-400">
            <PawPrint size={40} />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white">
          <Camera size={20} />
        </div>
      </button>

      {/* Texto */}
      <p className="text-sm text-gray-500">
        Clique para alterar a foto
      </p>

      {/* Input escondido */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}