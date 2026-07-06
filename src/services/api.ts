import axios from 'axios'

export type DayMix = {
    day: string
    biomass: number
    coal: number
    imports: number
    gas: number
    nuclear: number
    other: number
    hydro: number
    solar: number
    wind: number
    cleanEnergy: number
}

export type OptimalWindow = {
    fromDate: string
    toDate: string
    avgCleanEnergy: number
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
})

export const getEnergyData = (): Promise<DayMix[]> =>
    api.get<DayMix[]>('/api/dayMix').then(r => r.data)

export const getWindowCalc = (hours: number): Promise<OptimalWindow> =>
    api.get<OptimalWindow>(`/api/window?hours=${hours}`).then(r => r.data)