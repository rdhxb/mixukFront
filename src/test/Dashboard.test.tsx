import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Dashboard from '../components/Dashboard.tsx'

describe('Dashboard', () => {
    it('renders average clean energy and individual day cards', async () => {
        render(<Dashboard />)

        expect(screen.getByText(/Ładowanie/i)).toBeInTheDocument()

        expect(await screen.findByText(/64\.0%/)).toBeInTheDocument()

        expect(await screen.findByText(/60\.0%/)).toBeInTheDocument()
        expect(await screen.findByText(/69\.0%/)).toBeInTheDocument()
        expect(await screen.findByText(/63\.0%/)).toBeInTheDocument()
    })
})