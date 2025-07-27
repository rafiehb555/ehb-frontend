import Link from 'next/link'
import { HeroSection } from '@/components/home/HeroSection'
import { BenefitsSection } from '@/components/home/BenefitsSection'
import { FranchiseTypes } from '@/components/home/FranchiseTypes'
import { StatsSection } from '@/components/home/StatsSection'
import { CTASection } from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <FranchiseTypes />
      <StatsSection />
      <CTASection />
    </div>
  )
}
