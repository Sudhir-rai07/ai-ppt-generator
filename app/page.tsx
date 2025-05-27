"use client"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Layers, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedLogo from "@/components/animated-logo"
import PresentationPreview from "@/components/presentation-preview"
import FeatureCarousel from "@/components/feature-carousel"
import TestimonialCarousel from "@/components/testimonial-carousel"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />

        <div className="container relative px-4 py-24 mx-auto sm:px-6 lg:px-8 sm:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="flex items-center mb-6 space-x-2">
                <AnimatedLogo />
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">PresentAI</h2>
              </div>

              <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
                Create stunning presentations with{" "}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                    AI magic
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-violet-400/30 to-indigo-400/30 rounded-lg"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h1>

              <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-400">
                Transform your ideas into professional presentations in seconds. Our AI understands your content and
                creates beautiful slides that captivate your audience.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                 <Link href="/dashboard" className="flex items-center text-white">  Go to dashboard <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </div>

              <div className="flex items-center mt-8 space-x-4 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-1 text-violet-500" />
                  AI-powered
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-violet-500" />
                  Save 90% time
                </div>
                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-1 text-violet-500" />
                  100+ templates
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative lg:ml-auto"
            >
              <div className="relative">
                <PresentationPreview />
                <div className="absolute -top-6 -right-6">
                  <motion.div
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                      y: [0, -5, 0, -5, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                    className="p-3 bg-white rounded-full shadow-lg dark:bg-zinc-800"
                  >
                    <Sparkles className="w-6 h-6 text-violet-500" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Carousel Section */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Powerful features to transform your presentations
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Our AI-powered tools make creating professional presentations effortless.
            </p>
          </div>

          <FeatureCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              What our users are saying
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Join thousands of professionals who save time with PresentAI.
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to revolutionize your presentations?
            </h2>
            <p className="mb-8 text-xl text-violet-100">
              Join thousands of professionals who save time and create stunning presentations with PresentAI.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50">
                Get started for free
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Schedule a demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

