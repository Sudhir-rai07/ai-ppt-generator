'use client'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import usePromptStore from '@/store/usePromptStore'
import CreatePage from './CreatePage/create-page'
import CreativeAI from './CreatePage/generate-ai/CreativeAI'
import ScratchPage from './Scratch/ScratchPage'

const RenderPage = () => {
  const router = useRouter()
  const { page, setPage } = usePromptStore()

  useEffect(() => {
    setPage("create")
  }, [setPage])

  const handleBack = () => {
    setPage("create")
  }

  const handleSelectOption = (option: string) => {
    if (option === 'template') {
      router.push("/templates")
    } else if (option === 'create-scratch') {
      setPage("create-scratch")
    } else {
      setPage("creative-ai")
    }
  }

  const renderStep = () => {
    switch (page) {
      case 'create':
        return <CreatePage onSelectOption={handleSelectOption} />
      case 'creative-ai':
        return <CreativeAI onBack={handleBack} />
      case 'create-scratch':
        return <ScratchPage onBack={handleBack}/>
      default:
        return null
    }
  }
  return (
    <AnimatePresence mode='wait'>
      <motion.div key={page}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>
    </AnimatePresence>

  )
}

export default RenderPage
