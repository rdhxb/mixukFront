import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from  '../components/Calculator.tsx'

describe('Calculator', () => {
    it('shows validation error when hours out of range', async () => {
        const user = userEvent.setup()
        render(<Calculator />)

        const input = screen.getByRole('spinbutton')
        await user.clear(input)
        await user.type(input, '9')
        await user.click(screen.getByRole('button', { name: /oblicz/i }))

        expect(await screen.findByText(/od 1 do 6/i)).toBeInTheDocument()
    })

    it('displays result after successful API call', async () => {
        const user = userEvent.setup()
        render(<Calculator />)

        await user.click(screen.getByRole('button', { name: /oblicz/i }))

        expect(await screen.findByText(/75\.5%/)).toBeInTheDocument()
        expect(screen.getByText(/start/i)).toBeInTheDocument()
        expect(screen.getByText(/koniec/i)).toBeInTheDocument()
    })
})