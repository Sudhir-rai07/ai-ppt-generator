"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  text: string
}

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      text: "PresentAI has completely transformed how our marketing team creates presentations. What used to take days now takes minutes, and the quality is consistently impressive. The AI understands our brand guidelines perfectly.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateSoft",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      text: "As someone who presents to stakeholders weekly, PresentAI has been a game-changer. The AI generates compelling slides from my rough notes, and I can customize everything to match our exact needs.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Sales Executive",
      company: "Global Solutions",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      text: "Our sales team has seen a 40% increase in productivity since adopting PresentAI. Creating client-specific presentations used to be a bottleneck, but now we can generate professional decks in minutes.",
    },
    {
      id: 4,
      name: "David Kim",
      role: "University Professor",
      company: "State University",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      text: "I use PresentAI to create engaging lecture slides for my students. The AI helps me transform complex concepts into visually appealing presentations that keep my students engaged throughout the class.",
    },
    {
      id: 5,
      name: "Olivia Taylor",
      role: "Startup Founder",
      company: "NextWave Tech",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      text: "As a founder pitching to investors, I need my presentations to be perfect. PresentAI helps me create professional pitch decks that have impressed even the most critical VCs. Worth every penny!",
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, testimonials.length])

  const handleMouseEnter = () => {
    setAutoplay(false)
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
  }

  const handleMouseLeave = () => {
    setAutoplay(true)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative max-w-4xl mx-auto" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <Card className="border-none shadow-lg bg-white dark:bg-zinc-800">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6 text-violet-500">
                  <Quote className="w-10 h-10 rotate-180 opacity-20" />
                </div>
                <p className="mb-8 text-xl text-center text-zinc-700 dark:text-zinc-300">
                  "{testimonials[activeIndex].text}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[activeIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-zinc-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Avatar className="w-16 h-16 mb-4 border-2 border-violet-200">
                    <AvatarImage
                      src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[activeIndex].name}
                    />
                    <AvatarFallback>
                      {testimonials[activeIndex].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute z-10 flex items-center justify-between w-full top-1/2 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-zinc-200 dark:border-zinc-700 -ml-4"
          onClick={prevTestimonial}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-zinc-200 dark:border-zinc-700 -mr-4"
          onClick={nextTestimonial}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1)
              setActiveIndex(index)
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-violet-500" : "bg-zinc-300 dark:bg-zinc-600"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
