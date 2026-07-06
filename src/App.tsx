import Dashboard from './components/Dashboard'
import Calculator from './components/Calculator'

function App() {
  return (
      <div className="min-h-screen bg-gray-50 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel energetyczny</h1>
          <p className="text-gray-600">Miks energetyczny w podziale na dni</p>
        </header>

        <div className="mb-8">
          <Calculator />
        </div>

        <Dashboard />
      </div>
  )
}

export default App