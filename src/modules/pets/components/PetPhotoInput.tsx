type Props = {
  onSelect: (file: File) => void
}

export function PetPhotoInput({ onSelect }: Props) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files?.[0]) {
          onSelect(e.target.files[0])
        }
      }}
    />
  )
}