import { useState } from 'react'

export default function Header({ currentTab, onTabChange }) {
  const tabs = [
    { id: 'properties', label: 'Properties' },
    { id: 'tenants', label: 'Tenants' },
    { id: 'maintenance', label: 'Maintenance' },
  ]

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 text-white grid place-items-center font-bold">PM</div>
          <span className="text-xl font-semibold text-gray-800">Property Manager</span>
        </div>
        <nav className="flex items-center gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentTab === t.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {t.label}
            </button>
          ))}
          <a href="/test" className="ml-2 text-sm text-gray-500 hover:text-gray-700 underline">Test</a>
        </nav>
      </div>
    </header>
  )
}
