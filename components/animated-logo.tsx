"use client"

import { motion } from "framer-motion"

export default function AnimatedLogo() {
  return (
    <motion.div
      className="relative w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg"
      initial={{ rotate: -10 }}
      animate={{
        rotate: [0, 10, 0, -10, 0],
        scale: [1, 1.05, 1, 1.05, 1],
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 5,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-white font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        P
      </motion.div>
      <motion.div
        className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
