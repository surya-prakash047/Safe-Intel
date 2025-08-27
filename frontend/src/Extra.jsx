import { useEffect, useMemo, useState } from 'react'
import { MotionDiv } from './MotionPrimitives.jsx'
import SearchableSelect from './SearchableSelect.jsx'

function parseCsv(text) {
  const rows = []
  let i = 0, field = '', row = [], inQuotes = false
  while (i < text.length) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 2; continue }
        inQuotes = false; i++; continue
      }
      field += c; i++; continue
    }
    if (c === '"') { inQuotes = true; i++; continue }
    if (c === ',') { row.push(field); field = ''; i++; continue }
    if (c === '\n' || c === '\r') {
      if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = '' }
      while (text[i] === '\n' || text[i] === '\r') i++
      continue
    }
    field += c; i++
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows
}

function uniqueStrings(values) {
  const set = new Set()
  for (const v of values) {
    const s = String(v ?? '').trim()
    if (s) set.add(s)
  }
  return Array.from(set)
}

function normalizeId(value) {
  const s = String(value ?? '').trim()
  if (/^\d+\.0$/.test(s)) return String(parseInt(s, 10))
  return s
}

export default function DeviceForm() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    country: '',
    manufacturer: '',
    code: '',
    implanted: 'no',
  })
  const [loaded, setLoaded] = useState(false)
  const [csvRows, setCsvRows] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const url = new URL('../assets/form_data.csv', import.meta.url)
        const res = await fetch(url)
        const txt = await res.text()
        const rows = parseCsv(txt)
        setCsvRows(rows)
      } catch (e) {
        console.error('Failed to load CSV', e)
      } finally {
        setLoaded(true)
      }
    }
    load()
  }, [])

  const headers = useMemo(() => (csvRows[0] || []).map(h => String(h).trim()), [csvRows])
  const dataRows = useMemo(() => csvRows.slice(1), [csvRows])

  const idx = useMemo(() => {
    const map = {}
    headers.forEach((h, i) => { map[h] = i })
    return map
  }, [headers])

  const ids = useMemo(() => uniqueStrings(dataRows.map(r => normalizeId(r[idx.device_id]))), [dataRows, idx])
  const deviceNames = useMemo(() => uniqueStrings(dataRows.map(r => r[idx.device_name] ?? r[idx.name])), [dataRows, idx])
  const countries = useMemo(() => uniqueStrings(dataRows.map(r => r[idx.country] ?? r[idx.country_device] ?? r[idx.country_event])), [dataRows, idx])
  const manufacturers = useMemo(() => uniqueStrings(dataRows.map(r => r[idx.manufacturer_id])), [dataRows, idx])
  const codes = useMemo(() => uniqueStrings(dataRows.map(r => r[idx.code] ?? '')), [dataRows, idx])

  const update = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }))

  return (
    <MotionDiv initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Device Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelect label="ID" options={ids} value={form.id} onChange={update('id')} />
        <SearchableSelect label="Device name" options={deviceNames} value={form.name} onChange={update('name')} />
        <SearchableSelect label="Country" options={countries} value={form.country} onChange={update('country')} />
        <SearchableSelect label="Manufacturer" options={manufacturers} value={form.manufacturer} onChange={update('manufacturer')} />
        <SearchableSelect label="Code" options={codes} value={form.code} onChange={update('code')} />
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Implanted</label>
          <div className="flex gap-3">
            {['yes', 'no'].map(val => (
              <label key={val} className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="radio" name="implanted" value={val} checked={form.implanted === val} onChange={e => update('implanted')(e.target.value)} />
                {val === 'yes' ? 'Yes' : 'No'}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button type="button" className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800">Submit</button>
        <span className="text-xs text-slate-500">{loaded ? 'All dropdowns are searchable.' : 'Loading options…'}</span>
      </div>
    </MotionDiv>
  )
}

// import { useState } from 'react'
// import { MotionDiv } from './MotionPrimitives.jsx'
// import SearchableSelect from './SearchableSelect.jsx'

// const ids = ['MD-1001', 'MD-1002', 'MD-1050', 'MD-1100']
// const deviceNames = ['Cardiac Monitor', 'Infusion Pump', 'Surgical Laser', 'Ventilator']
// const countries = ['United States', 'United Kingdom', 'Germany', 'India', 'Japan']
// const manufacturers = ['Acme MedTech', 'HealthCore', 'BioPulse', 'AeroLife', 'MediGen']
// const codes = ['A12', 'B34', 'C56', 'D78']

// export default function DeviceForm() {
//   const [form, setForm] = useState({
//     id: '',
//     name: '',
//     country: '',
//     manufacturer: '',
//     code: '',
//     implanted: 'no',
//   })

//   const update = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }))

//   return (
//     <MotionDiv initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
//       className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
//       <h2 className="text-xl font-semibold text-slate-900 mb-4">Device Information</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <SearchableSelect label="ID" options={ids} value={form.id} onChange={update('id')} />
//         <SearchableSelect label="Device name" options={deviceNames} value={form.name} onChange={update('name')} />
//         <SearchableSelect label="Country" options={countries} value={form.country} onChange={update('country')} />
//         <SearchableSelect label="Manufacturer" options={manufacturers} value={form.manufacturer} onChange={update('manufacturer')} />
//         <SearchableSelect label="Code" options={codes} value={form.code} onChange={update('code')} />
//         <div className="space-y-1">
//           <label className="text-sm font-medium text-slate-700">Implanted</label>
//           <div className="flex gap-3">
//             {['yes', 'no'].map(val => (
//               <label key={val} className="inline-flex items-center gap-2 text-sm text-slate-700">
//                 <input type="radio" name="implanted" value={val} checked={form.implanted === val} onChange={e => update('implanted')(e.target.value)} />
//                 {val === 'yes' ? 'Yes' : 'No'}
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="mt-5 flex items-center gap-3">
//         <button type="button" className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800">Submit</button>
//         <span className="text-xs text-slate-500">All dropdowns are searchable.</span>
//       </div>
//     </MotionDiv>
//   )
// }



