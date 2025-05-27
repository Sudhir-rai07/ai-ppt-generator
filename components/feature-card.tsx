"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  color: string
}

export default function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorMap: Record<string, string> = {
    violet: "bg-violet-500",
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    cyan: "bg-cyan-500",
    teal: "bg-teal-500",
  }

  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="h-full">
      <Card className="h-full transition-shadow hover:shadow-md dark:hover:shadow-zinc-800/30">
        <CardHeader>
          <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${colorMap[color]} text-white`}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
          <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
