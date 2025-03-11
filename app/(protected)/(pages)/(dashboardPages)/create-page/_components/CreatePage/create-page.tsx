'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { containerVarients, CreatePageCard, itemVarients } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import RecentPrompts from './generate-ai/recent-prompts'
import usePromptStore from '@/store/usePromptStore'

type Props = {
    onSelectOption: (option: string) => void
}
const CreatePage = ({ onSelectOption }: Props) => {
    const { prompts, setPage } = usePromptStore()

    useEffect(() => {
        setPage("create")
    }, [])
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className='space-y-8'
        >
            <motion.div
                variants={itemVarients}
                className='text-center space-y-2'
            >
                <h1 className='text-4xl font-bold text-primary'>
                    How would you like to get started?
                </h1>
                <p className="text-secondary">
                    Choose your perfered moethod to begin
                </p>
                <motion.div
                    variants={containerVarients}
                    className='grid gap-6 md:grid-cols-3'
                >
                    {CreatePageCard.map(option => (
                        <motion.div
                            key={option.type}
                            variants={itemVarients}
                            whileHover={{
                                scale: 1.05,
                                rotate: 1,
                                transition: { duration: 0.1 }
                            }}
                            className={`${option.highlight ? "border-orange-500 border-2" : "hover:bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300  border"} rounded-xl p-px transition-all duration-300 ease-in-out`}

                        >
                            <motion.div
                                className='w-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black
                            rounded-xl'
                                whileHover={{
                                    transition: {
                                        duration: 0.1
                                    }
                                }}
                            >
                                <div className='flex flex-col items-start w-full gap-y-3'>
                                    <div>
                                        <p className='text-primary text-lg text-s font-semibold'>{option.title}</p>
                                        <p className={`${option.highlight ? "text-vivid" : "text-primary"} text-4xl font-bold`}>
                                            {option.highlightedText}
                                        </p>
                                    </div>
                                    <p className='text-secondary text-sm font-normal'>{option.description}</p>
                                </div>
                                <motion.div
                                    className='self-end'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant={option.highlight ? "default" : "outline"}
                                        className='w-fit rounded-xl font-bold'
                                        size={'sm'}
                                        onClick={() => onSelectOption(option.type)}
                                    >
                                        {option.highlight ? "Generate" : "Continue"}
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>


            {prompts.length > 0 && <RecentPrompts />}
        </motion.div>
    )
}

export default CreatePage
