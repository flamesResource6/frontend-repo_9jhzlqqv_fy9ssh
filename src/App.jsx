import { useState } from 'react'
import Header from './components/Header'
import PropertyForm from './components/PropertyForm'
import PropertyList from './components/PropertyList'

function App() {
  const [tab, setTab] = useState('properties')
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = () => setRefreshKey(k => k + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header currentTab={tab} onTabChange={setTab} />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {tab === 'properties' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Add Property</h2>
              <PropertyForm onCreated={refresh} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Properties</h2>
              <PropertyList refreshKey={refreshKey} />
            </div>
          </div>
        )}
        {tab === 'tenants' && (
          <div className="text-center text-gray-600">Tenant management coming next</div>
        )}
        {tab === 'maintenance' && (
          <div className="text-center text-gray-600">Maintenance tracking coming next</div>
        )}
      </main>
    </div>
  )
}

export default App
