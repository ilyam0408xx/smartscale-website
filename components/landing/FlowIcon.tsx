type IconKind = 'lead' | 'wa' | 'crm' | 'doc' | 'bell'

export default function FlowIcon({ kind }: { kind: IconKind }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (kind) {
    case 'lead':
      return (
        <svg {...common}>
          <path d="M12 2v4" />
          <path d="M5 7l3 3" />
          <path d="M19 7l-3 3" />
          <circle cx="12" cy="14" r="6" />
        </svg>
      )
    case 'wa':
      return (
        <svg {...common}>
          <path d="M3 21l1.6-4.6A8 8 0 1 1 8.4 20.4L3 21z" />
          <path d="M9 10c0 3 2 5 5 5" />
        </svg>
      )
    case 'crm':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 14h6" />
        </svg>
      )
    case 'doc':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8" />
          <path d="M8 17h5" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
      )
    default:
      return null
  }
}

export type { IconKind }
