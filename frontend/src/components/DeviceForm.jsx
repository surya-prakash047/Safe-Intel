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
    deviceName: '',
    manufacturerName: '',
    classification: '',
    implanted: 'no',
  })
  const [loaded, setLoaded] = useState(false)
  const [csvRows, setCsvRows] = useState([])
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const url = '/master_v2.csv'
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

  const deviceNames = useMemo(() => uniqueStrings(dataRows.map(r => r[idx.name])), [dataRows, idx])
  const manufacturerNames = useMemo(() => uniqueStrings(dataRows.map(r => r[idx.name_manufacturer])), [dataRows, idx])
  const classifications = useMemo(() => uniqueStrings(dataRows.map(r => r[idx.classification])), [dataRows, idx])

  const update = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    setPrediction(null) // Clear previous prediction
    
    const requestData = {
      name: form.deviceName,
      name_manufacturer: form.manufacturerName,
      classification: form.classification,
      implanted: form.implanted,
    };
    
    console.log("🚀 Submitting prediction request:", requestData);
    
    // Use relative URL for production, localhost for development
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://safe-intel-623106008673.europe-west1.run.app/predict' : 'https://safe-intel-623106008673.europe-west1.run.app/predict';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
      
      console.log("📡 Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Prediction failed with status: ${response.status}`)
      }
      
      const result = await response.json()
      console.log("✅ Prediction result:", result);
      setPrediction(result)
    } catch (err) {
      console.error("❌ Prediction error:", err);
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MotionDiv initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Device Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelect label="Device Name" options={deviceNames} value={form.deviceName} onChange={update('deviceName')} />
        <SearchableSelect label="Manufacturer Name" options={manufacturerNames} value={form.manufacturerName} onChange={update('manufacturerName')} />
        <SearchableSelect label="Classification" options={classifications} value={form.classification} onChange={update('classification')} />
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Implanted</label>
          <div className="flex gap-3">
            {['yes', 'no', 'unknown'].map(val => (
              <label key={val} className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="radio" name="implanted" value={val} checked={form.implanted === val} onChange={e => update('implanted')(e.target.value)} />
                {val === 'yes' ? 'Yes' : val === 'no' ? 'No' : 'Unknown'}
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* Prediction Results */}
      {prediction && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Prediction Result</h3>
            <p className="text-blue-800">
              <strong>Severity Class:</strong> {prediction.prediction}
            </p>
          </div>
          
          {/* Recommended Actions */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">Recommended Actions</h3>
            {prediction.prediction === '1' && (
              <div className="text-amber-800">
                <p className="font-semibold text-red-700 mb-2">⚠️ HIGH SEVERITY - IMMEDIATE ACTION REQUIRED</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>🚨 Immediate Action → Stop distribution and usage of the device.</li>
                  <li>📢 Urgent Communication → Notify hospitals, clinics, and distributors immediately with clear instructions.</li>
                  <li>🔄 Recall Execution → Arrange device return, replacement, or field correction.</li>
                  <li>🧪 Root Cause Analysis → Launch urgent investigation (e.g., design flaw, manufacturing defect).</li>
                  <li>📝 Regulatory Reporting → File formal recall notice with relevant authorities (e.g., national regulator, health ministry).</li>
                  <li>👩‍⚕️ Patient Safety Measures → Advise on monitoring, treatment, or follow-ups if patients are at risk.</li>
                </ul>
              </div>
            )}
            {prediction.prediction === '2' && (
              <div className="text-amber-800">
                <p className="font-semibold text-orange-700 mb-2">🔶 MEDIUM-HIGH SEVERITY - PROMPT ACTION NEEDED</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>⚠️ Controlled Recall / Field Correction → Remove affected batches or issue corrective instructions.</li>
                  <li>📢 Customer Notification → Inform healthcare providers about the issue and recommended action (inspection, repair, or labeling update).</li>
                  <li>🔍 Failure Mode Investigation → Conduct root cause analysis to prevent recurrence.</li>
                  <li>🔄 Replacement / Repair Program → Offer device servicing, software updates, or replacement parts.</li>
                  <li>📊 Tracking & Traceability → Identify and monitor all distributed units.</li>
                </ul>
              </div>
            )}
            {prediction.prediction === '3' && (
              <div className="text-amber-800">
                <p className="font-semibold text-yellow-700 mb-2">🔸 MEDIUM SEVERITY - SYSTEMATIC MONITORING</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>🏷️ Labeling / Instructions Update → Correct information in user manuals, labels, or packaging.</li>
                  <li>📢 Inform Distributors & Users → Communicate minor risk but clarify device can remain in use with precautions.</li>
                  <li>🔧 Minor Fixes → Implement small design, manufacturing, or software improvements.</li>
                  <li>📝 Internal Documentation → Record the issue, corrective action, and quality system updates.</li>
                  <li>🔮 Ongoing Monitoring → Keep track of any similar complaints to ensure no escalation.</li>
                </ul>
              </div>
            )}
            {prediction.prediction === '4' && (
              <div className="text-amber-800">
                <p className="font-semibold text-green-700 mb-2">✅ LOW SEVERITY - STANDARD MONITORING</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>📢 Issue Safety Notice → Publish communication to users, hospitals, and distributors with specific instructions.</li>
                  <li>🔍 Risk Clarification → Provide clear details on the nature of risk, usage precautions, and next steps.</li>
                  <li>⚙️ Corrective / Preventive Action (CAPA) → Implement preventive controls in manufacturing/design.</li>
                  <li>📊 Monitor Feedback → Collect user responses and field data for effectiveness of the alert.</li>
                  <li>🔄 Update Supply Chain → Ensure distributors and partners act on the safety notice.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}
      
      <div className="mt-5 flex items-center gap-3">
        <button 
          type="button" 
          onClick={handleSubmit}
          disabled={isLoading || !form.deviceName || !form.manufacturerName || !form.classification}
          className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Predicting...' : 'Predict Severity'}
        </button>
        <span className="text-xs text-slate-500">{loaded ? 'All dropdowns are searchable.' : 'Loading options…'}</span>
      </div>
    </MotionDiv>
  )
}


