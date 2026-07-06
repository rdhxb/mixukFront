import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import type { DayMix } from '../services/api'

const COLORS: Record<string, string> = {
    wind:    '#3b82f6',
    solar:   '#facc15',
    hydro:   '#06b6d4',
    biomass: '#84cc16',
    nuclear: '#a855f7',
    gas:     '#f97316',
    coal:    '#44403c',
    imports: '#94a3b8',
    other:   '#cbd5e1',
}

const LABELS: Record<string, string> = {
    wind: 'Wiatr',
    solar: 'Słońce',
    hydro: 'Woda',
    biomass: 'Biomasa',
    nuclear: 'Jądrowa',
    gas: 'Gaz',
    coal: 'Węgiel',
    imports: 'Import',
    other: 'Inne',
}

type Props = {
    dayData: DayMix
}

type ChartEntry = {
    name: string
    value: number
    colorKey: string
}

function DayChart({ dayData }: Props) {
    const chartData: ChartEntry[] = Object.entries(dayData)
        .filter(([key]) => key !== 'day' && key !== 'cleanEnergy')
        .map(([key, value]) => ({
            name: LABELS[key] || key,
            value: Number((value as number).toFixed(2)),
            colorKey: key,
        }))
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value)

    const clean = dayData.cleanEnergy.toFixed(1)

    const formattedDate = new Date(dayData.day).toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 capitalize">
                {formattedDate}
            </h3>
            <p className="text-sm text-gray-500 mb-4">Miks energetyczny</p>

            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={90}
                            paddingAngle={2}
                        >
                            {chartData.map((entry) => (
                                <Cell key={entry.colorKey} fill={COLORS[entry.colorKey]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(v) => `${v}%`}
                            contentStyle={{
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                fontSize: '14px',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-4 text-sm">
                {chartData.map(item => (
                    <div key={item.colorKey} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                            <span
                                className="w-3 h-3 rounded-sm flex-shrink-0"
                                style={{ backgroundColor: COLORS[item.colorKey] }}
                            />
                            <span className="text-gray-700 truncate">{item.name}</span>
                        </div>
                        <span className="font-medium text-gray-900 tabular-nums">
                            {item.value}%
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-5 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200">
                <p className="text-sm text-green-700 font-medium">Czysta energia</p>
                <p className="text-3xl font-bold text-green-800">{clean}%</p>
            </div>
        </div>
    )
}

export default DayChart