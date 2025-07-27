import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/home/HeroSection'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />)
    expect(screen.getByText('EHB Franchise System')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Decentralized franchise ecosystem/)).toBeInTheDocument()
  })

  it('renders the register franchise button', () => {
    render(<HeroSection />)
    expect(screen.getByText('Register Franchise')).toBeInTheDocument()
  })

  it('renders the view dashboard button', () => {
    render(<HeroSection />)
    expect(screen.getByText('View Dashboard')).toBeInTheDocument()
  })

  it('has correct links', () => {
    render(<HeroSection />)

    const registerLink = screen.getByText('Register Franchise').closest('a')
    const dashboardLink = screen.getByText('View Dashboard').closest('a')

    expect(registerLink).toHaveAttribute('href', '/franchise/register')
    expect(dashboardLink).toHaveAttribute('href', '/dashboard')
  })

  it('applies correct CSS classes', () => {
    render(<HeroSection />)

    const section = screen.getByText('EHB Franchise System').closest('section')
    expect(section).toHaveClass('relative', 'bg-gradient-to-br', 'from-primary-600', 'to-primary-800')
  })
})
