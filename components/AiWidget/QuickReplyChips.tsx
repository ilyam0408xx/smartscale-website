type Props = {
  chips: string[]
  onSelect: (chip: string) => void
  disabled?: boolean
}

export default function QuickReplyChips({ chips, onSelect, disabled }: Props) {
  if (!chips?.length) return null
  return (
    <div className="aiw-chips">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          className="aiw-chip"
          onClick={() => onSelect(chip)}
          disabled={disabled}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
