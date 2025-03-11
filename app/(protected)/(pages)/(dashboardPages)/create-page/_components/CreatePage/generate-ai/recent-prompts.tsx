'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { containerVarients, itemVarients } from '@/lib/constants'
import { timeAgo } from '@/lib/utils'
import useCreateAIStore from '@/store/useCreateAIStore'
import usePromptStore from '@/store/usePromptStore'
import { motion } from 'framer-motion'
import React from 'react'
import { toast } from 'sonner'

const RecentPrompts = () => {
    const { prompts, setPage } = usePromptStore()
    const {addMultipleOutline, setCurrentAiPrompt} = useCreateAIStore()
    const handleEdit = (id: string) =>{
        const prompt = prompts.find((prompt)=> prompt.id === id)
        if(prompt){
            setPage('creative-ai')
            addMultipleOutline(prompt.outlines)
            setCurrentAiPrompt(prompt.title)
        } else {
            toast.error("ERROR!", {
                description: "Prompt not found!"
            })
        }
    }
    return (
        <motion.div
            variants={containerVarients}
            className='space-y-4 !mt-20'
        >
            <motion.h2
                variants={itemVarients}
                className='text-2xl font-semibold text-center'
            >
                Your Recent Prompts
            </motion.h2>

            <motion.div variants={containerVarients} className='space-y-2 w-full lg:max-w-[80%] mx-auto'>
                {prompts.map((prompt, i) => (
                    <motion.div key={i} variants={itemVarients}>
                        <Card className='p-4 flex items-center justify-between hover:bg-accent/50 transition-colors divide-purple-300'>
                            <div className="max-w-[70%]">
                                <h3 className='font-semibold text-xl line-clamp-1'>{prompt?.title}</h3>
                                <p className='font-semibold text-sm text-muted-foreground'>
                                    {timeAgo(prompt.createdAt)}
                                </p>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span className='text-vivid text-sm'>Creative AI</span>
                                <Button
                                variant={"default"}
                                size={"sm"}
                                className='rounded-xl bg-primary-20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary'
                                onClick={()=> handleEdit(prompt.id)}
                                >
                                    Edit
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default RecentPrompts
