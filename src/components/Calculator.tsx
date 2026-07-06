import { useState, type KeyboardEvent, type ChangeEvent } from 'react'
import { getWindowCalc, type OptimalWindow } from '../services/api'

function Calculator() {
    const [hours, setHours] = useState<number>(3)
    const [result, setResult] = useState<OptimalWindow | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        if (!Number.isInteger(hours) || hours < 1 || hours > 6) {
            setError('Podaj liczbę całkowitą od 1 do 6')
            return
        }
        setError(null)
        setLoading(true)
        try {
            const data = await getWindowCalc(hours)
            setResult(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Nieznany błąd')
            setResult(null)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSubmit()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHours(Number(e.target.value))
    }

    const formatDateTime = (isoString: string) => {
        const d = new Date(isoString)
        return {
            date: d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' }),
            time: d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Najlepsze okno na zużycie energii
            </h2>
            <p className="text-sm text-gray-500 mb-6">
                Podaj ile godzin potrzebujesz — znajdziemy okres z największym udziałem czystej energii
            </p>

            <div className="flex gap-3 items-end mb-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Liczba godzin <span className="text-gray-400 font-normal">(1–6)</span>
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="6"
                        step="1"
                        value={hours}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
                >
                    {loading ? 'Liczę...' : 'Oblicz'}
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            {result && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                        <p className="text-xs uppercase tracking-wide text-blue-700 font-medium mb-1">
                            Start
                        </p>
                        <p className="text-3xl font-bold text-blue-900">
                            {formatDateTime(result.fromDate).time}
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                            {formatDateTime(result.fromDate).date}
                        </p>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                        <p className="text-xs uppercase tracking-wide text-indigo-700 font-medium mb-1">
                            Koniec
                        </p>
                        <p className="text-3xl font-bold text-indigo-900">
                            {formatDateTime(result.toDate).time}
                        </p>
                        <p className="text-sm text-indigo-700 mt-1">
                            {formatDateTime(result.toDate).date}
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl p-5">
                        <p className="text-xs uppercase tracking-wide text-emerald-100 font-medium mb-1">
                            Czysta energia
                        </p>
                        <p className="text-3xl font-bold">
                            {result.avgCleanEnergy.toFixed(1)}%
                        </p>
                        <p className="text-sm text-emerald-100 mt-1">
                            średni udział w oknie
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Calculator