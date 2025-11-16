import { useEffect, useState } from 'react'

export default function PropertyList({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/properties`)
        if (!res.ok) throw new Error('Failed to load properties')
        const data = await res.json()
        setItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [refreshKey])

  if (loading) return <p className="text-gray-500">Loading properties...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(p => (
        <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800">{p.name}</h3>
          <p className="text-sm text-gray-600">{p.address}{p.unit ? `, #${p.unit}` : ''}</p>
          <p className="text-sm text-gray-600">{p.city}, {p.state} {p.zip_code}</p>
          <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-3">
            {p.bedrooms != null && <span>{p.bedrooms} bd</span>}
            {p.bathrooms != null && <span>{p.bathrooms} ba</span>}
            {p.rent != null && <span>${p.rent}/mo</span>}
            <span className={`px-2 py-0.5 rounded text-xs ${p.status === 'available' ? 'bg-green-100 text-green-700' : p.status === 'occupied' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{p.status}</span>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <div className="col-span-full text-center text-gray-500">No properties yet</div>
      )}
    </div>
  )
}
