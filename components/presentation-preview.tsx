"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PresentationPreview() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "The Future of AI",
      subtitle: "Transforming how we work and live",
      color: "from-violet-500 to-indigo-500",
    },
    {
      title: "Key Trends",
      subtitle: "Generative AI, Multimodal Models, AI Agents",
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Business Impact",
      subtitle: "Automation, Innovation, Competitive Advantage",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-2xl aspect-[16/9]">
      <div className="absolute inset-0 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} opacity-10`} />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`px-4 py-1 mb-4 text-sm font-medium text-white rounded-full bg-gradient-to-r ${slides[currentSlide].color}`}
              >
                Slide {currentSlide + 1}
              </motion.div>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-2 text-2xl font-bold text-zinc-900"
              >
                {slides[currentSlide].title}
              </motion.h3>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`w-12 h-1 mb-4 rounded-full bg-gradient-to-r ${slides[currentSlide].color}`}
              />

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-zinc-600"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 space-x-1">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentSlide ? `bg-gradient-to-r ${slides[currentSlide].color}` : "bg-zinc-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 -mt-10 -mr-10 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-full blur-xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 -mb-8 -ml-8 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-xl" />
    </div>
  )
}
