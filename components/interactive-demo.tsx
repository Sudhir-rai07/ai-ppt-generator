"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function InteractiveDemo() {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [slides, setSlides] = useState<string[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  const examplePrompt = "Create a presentation about the future of artificial intelligence and its impact on society."

  const handleGenerate = () => {
    if (!input.trim()) return

    setIsGenerating(true)
    setSlides([])

    // Simulate AI generation
    setTimeout(() => {
      const generatedSlides = [
        "The Future of AI",
        "AI is transforming industries at an unprecedented pace",
        "Key trends: Generative AI, Multimodal Models, AI Agents",
        "Ethical considerations and responsible development",
        "How businesses can prepare for an AI-driven future",
      ]

      setSlides(generatedSlides)
      setIsGenerating(false)
      setCurrentSlide(0)
    }, 2000)
  }

  const handleUseExample = () => {
    setInput(examplePrompt)
  }

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [slides])

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="p-6 bg-white rounded-xl shadow-sm dark:bg-zinc-800">
        <h3 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Enter your presentation topic or outline
        </h3>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your presentation or paste your content..."
          className="min-h-[200px] mb-4"
        />

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          >
            {isGenerating ? (
              <>
                Generating <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
              </>
            ) : (
              <>
                Generate presentation <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <Button variant="outline" onClick={handleUseExample}>
            Use example
          </Button>
        </div>
      </div>

      <div className="relative flex items-center justify-center p-6 overflow-hidden bg-zinc-100 rounded-xl dark:bg-zinc-800/50 min-h-[300px]">
        {slides.length === 0 ? (
          <div className="text-center text-zinc-500 dark:text-zinc-400">
            {isGenerating ? (
              <div className="flex flex-col items-center">
                <Sparkles className="w-8 h-8 mb-4 animate-pulse text-violet-500" />
                <p>AI is creating your presentation...</p>
              </div>
            ) : (
              <p>Your presentation preview will appear here</p>
            )}
          </div>
        ) : (
          <div className="w-full">
            <div className="relative w-full aspect-[16/9] bg-white rounded-lg shadow-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                >
                  {currentSlide === 0 ? (
                    <h2 className="text-3xl font-bold text-zinc-900">{slides[currentSlide]}</h2>
                  ) : (
                    <>
                      <h3 className="mb-4 text-2xl font-semibold text-zinc-900">{slides[currentSlide]}</h3>
                      <div className="w-16 h-1 mb-4 bg-violet-500 rounded-full" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-4 space-x-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? "bg-violet-500" : "bg-zinc-300 dark:bg-zinc-600"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
