'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HeroSection } from './sections/HeroSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { DemoSection } from './sections/DemoSection'
import { MetricsSection } from './sections/MetricsSection'
import { CTASection } from './sections/CTASection'
import { Footer } from './sections/Footer'
import { Navigation } from '../Navigation'

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-prism-bg overflow-hidden">
      <Navigation isScrolled={isScrolled} />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <MetricsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}
