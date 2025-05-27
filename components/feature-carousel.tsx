"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Sparkles, PenTool, Zap, Layers, Clock, ArrowRight, ImageIcon, Palette, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const colorMap: Record<string, string> = {
    violet: "bg-violet-500",
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    cyan: "bg-cyan-500",
    teal: "bg-teal-500",
  }

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg dark:hover:shadow-zinc-800/30">
      <CardContent className="flex flex-col items-start p-6">
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${colorMap[color]} text-white mb-4`}>
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function FeatureCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(carouselRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Content Generation",
      description: "Generate complete presentations from simple prompts or outlines.",
      color: "violet",
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Smart Design System",
      description: "Automatically applies beautiful design principles to your content.",
      color: "indigo",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Transformations",
      description: "Change themes, styles, and layouts with a single click.",
      color: "purple",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Template Library",
      description: "Access 100+ professionally designed templates for any occasion.",
      color: "blue",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time-Saving Automation",
      description: "Create presentation-ready slides in seconds, not hours.",
      color: "cyan",
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Export Anywhere",
      description: "Export to PowerPoint, PDF, or present directly from our platform.",
      color: "teal",
    },
    {
      icon: <ImageIcon className="w-6 h-6" />,
      title: "Smart Image Suggestions",
      description: "AI suggests relevant images and graphics for your slides.",
      color: "violet",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Brand Consistency",
      description: "Maintain your brand colors and styles across all presentations.",
      color: "indigo",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Collaboration Tools",
      description: "Work together with your team in real-time on presentations.",
      color: "purple",
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div ref={carouselRef} className="relative overflow-hidden">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
