'use client'

import { motion } from 'framer-motion'

export function CTASection() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Ready to Transform Your Development?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join engineering teams revolutionizing their code review process with PRISM AI.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="glass px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500/30 to-blue-500/30 hover:from-cyan-500/40 hover:to-blue-500/40 font-semibold">
              Start Free Trial
            </button>
            <button className="glass px-8 py-4 rounded-lg hover:bg-white/10 font-semibold">
              Schedule Demo
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            No credit card required. 14-day free trial.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
