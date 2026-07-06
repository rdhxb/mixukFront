import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('*/api/dayMix', () =>
        HttpResponse.json([
            { day: '2026-07-06', biomass: 5, coal: 2, imports: 8, gas: 30, nuclear: 15, other: 0, hydro: 3, solar: 12, wind: 25, cleanEnergy: 60 },
            { day: '2026-07-07', biomass: 4, coal: 1, imports: 5, gas: 25, nuclear: 20, other: 0, hydro: 5, solar: 10, wind: 30, cleanEnergy: 69 },
            { day: '2026-07-08', biomass: 6, coal: 3, imports: 6, gas: 28, nuclear: 18, other: 0, hydro: 4, solar: 8, wind: 27, cleanEnergy: 63 },
        ])
    ),
    http.get('*/api/window', ({ request }) => {
        const url = new URL(request.url)
        const hours = Number(url.searchParams.get('hours') ?? '3')
        return HttpResponse.json({
            fromDate: '2026-07-07T02:00:00',
            toDate: `2026-07-07T${String(2 + hours).padStart(2, '0')}:00:00`,
            avgCleanEnergy: 75.5,
        })
    }),
]