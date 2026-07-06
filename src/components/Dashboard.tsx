import { useEffect, useState } from 'react'
import { getEnergyData, type DayMix } from '../services/api'
import DayChart from './DayChart'

function Dashboard() {
    const [data, setData] = useState<DayMix[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getEnergyData()
            .then(setData)
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="text-center text-gray-500">Ładowanie...</p>
    if (error) return <p className="text-center text-red-500">Błąd: {error}</p>
    if (data.length === 0) return <p className="text-center text-gray-500">Brak danych</p>

    const avgClean = (
        data.reduce((sum, d) => sum + d.cleanEnergy, 0) / data.length
    ).toFixed(1)

    return (
        <section>
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
                <p className="text-emerald-100 text-sm uppercase tracking-wide">Średnia z okresu</p>
                <p className="text-5xl font-bold mt-1">{avgClean}%</p>
                <p className="text-emerald-100 mt-1">udziału czystej energii</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map(dayData => (
                    <DayChart key={dayData.day} dayData={dayData} />
                ))}
            </div>
        </section>
    )
}

export default Dashboard