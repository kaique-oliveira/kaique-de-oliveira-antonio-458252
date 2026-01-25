import { useState } from 'react'

type Props = {
  onSelect: (file: File) => void
  initialUrl?: string | null
}

export function PetPhotoInput({ onSelect, initialUrl }: Props) {
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
    <div className="space-y-2">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  )
}