import { useState } from 'react'

export default function PropertyForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '', address: '', city: '', state: '', zip_code: '', unit: '', bedrooms: '', bathrooms: '', rent: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        ...form,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        rent: form.rent ? Number(form.rent) : null,
      }
      const res = await fetch(`${baseUrl}/api/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create property')
      setForm({ name: '', address: '', city: '', state: '', zip_code: '', unit: '', bedrooms: '', bathrooms: '', rent: '' })
      onCreated && onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Property Name" className="input" required />
        <input name="unit" value={form.unit} onChange={handleChange} placeholder="Unit (optional)" className="input" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" required />
        <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="input" required />
        <input name="zip_code" value={form.zip_code} onChange={handleChange} placeholder="ZIP" className="input" required />
        <input name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="input" />
        <input name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="input" />
        <input name="rent" value={form.rent} onChange={handleChange} placeholder="Monthly Rent" className="input" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded">
        {loading ? 'Saving...' : 'Add Property'}
      </button>
    </form>
  )
}
