import { useMemo, useState } from 'react'

export default function SearchableSelect({ label, options, value, onChange, placeholder = 'Search…' }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter(opt => String(opt.label ?? opt).toLowerCase().includes(q))
  }, [options, query])

  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <div className="rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-slate-400">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-sm outline-none bg-white"
        />
        {open && (
        <div className="max-h-40 overflow-auto divide-y divide-slate-100">
          {filtered.length === 0 && (
            <div className="px-3 py-2 text-sm text-slate-500">No results</div>
          )}
          {filtered.map(opt => {
            const key = String(opt.value ?? opt)
            const labelText = String(opt.label ?? opt)
            const selected = value === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  onChange(key)
                  setQuery(labelText)
                  setOpen(false)
                }}
                className={`w-full border-y text-left px-3 py-2 text-sm ${selected ? 'bg-slate-100 text-black' : 'hover:bg-slate-50'}`}
              >
                {labelText}
              </button>
            )
          })}
        </div>
        )}
      </div>
    </div>
  )
}


