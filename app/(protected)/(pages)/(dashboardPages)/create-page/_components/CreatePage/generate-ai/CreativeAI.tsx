"use client"

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { containerVarients, itemVarients } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Loader, Loader2, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import useCreateAIStore from '@/store/useCreateAIStore'
import { Select, SelectContent, SelectItem } from '@/components/ui/select'
import { SelectTrigger, SelectValue } from '@radix-ui/react-select'
import CardList from '../../Common/CardList'
import usePromptStore from '@/store/usePromptStore'
import RecentPrompts from './recent-prompts'
import { toast } from 'sonner'

type Props = {
    onBack: () => void
}

const CreativeAI = ({ onBack }: Props) => {

    const router = useRouter()
    const { currentAiPrompt,
            setCurrentAiPrompt,
            outlines,
            resetOutlines,
            addOutline,
            addMultipleOutline
    } = useCreateAIStore()
    const [editingCard, setEditingCard] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedCard, setSelectedCard] = useState<string | null>(null)
    const [editText, setEditText] = useState('')
    const [noOfCards, setNoOfCards] = useState(0)
    const { prompts, addPrompts } = usePromptStore()


    const handleBack = () => {
        onBack()
    }

    const resetCards = () => {
        setEditingCard(null)
        setSelectedCard(null)
        setEditText('')

        setCurrentAiPrompt('')
        resetOutlines()
    }

    const generateOutlines = async () => {
        if(currentAiPrompt === ""){
            toast.error("Error",{
                description: "Please enter a prompt to generate an outline"
            })
            return
        }

        setIsGenerating(true)

        const res = await generateCreativePrompt(currentAiPrompt)

        //WIP: use openAI and complete this stuff 
    } 

    const handleGenerate = () => {

    }
    return (
        <motion.div className='space-y-6 w-full mx-auto px-4 sm:px-6 lg:px-8' variants={containerVarients}
            initial="hidden"
            animate="visible"
        >
            <Button
                onClick={handleBack}
                variant={'outline'}
                className='mb-4'
            >
                <ChevronLeft className='mr-2 h-4 w-4' /> Back
            </Button>

            <motion.div variants={itemVarients}
                className='text-center space-y-2'
            >
                <h1 className='text-4xl font-bold text-primary'>
                    Create With <span className='text-vivid'>GenerativeAI</span>
                </h1>
                <p className="text-secondary">
                    What would you like to create today?
                </p>
            </motion.div>

            <motion.div
                variants={itemVarients}
                className='bg-primary/10 rounded-xl p-4'
            >
                <div
                    className='flex md:flex-row flex-col sm:flex-row justify-between gap-3 items-center rounded-xl'
                >
                    <Input placeholder='Enter a prompt and add to the cards...'
                        className='text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow'
                        required
                        value={currentAiPrompt}
                        onChange={(e) => setCurrentAiPrompt(e.target.value)}
                    />
                    <div
                        className='flex items-center gap-3'
                    >
                        <Select
                            value={noOfCards.toString()}
                            onValueChange={(value) => setNoOfCards(parseInt(value))}
                        >
                            <SelectTrigger className='w-fit gap-2 font-semibold shadow-xl'>
                                <SelectValue placeholder={"Select number of cards"} />
                            </SelectTrigger>

                            <SelectContent className='w-fit'>
                                {outlines.length === 0 ? (
                                    <SelectItem
                                        value='0'
                                        className='font-semibold'>
                                        No Cards
                                    </SelectItem>
                                ) : (
                                    Array.from({ length: outlines.length }, (_, idx) => idx + 1)
                                        .map((num) => (
                                            <SelectItem
                                                key={num}
                                                value={num.toString()}
                                                className='font-semibold'
                                            >
                                                {num} {num === 1 ? "Card" : "Cards"}
                                            </SelectItem>
                                        ))
                                )}
                            </SelectContent>
                        </Select>

                        <Button
                            variant={'destructive'}
                            onClick={resetCards}
                            size='icon'
                            aria-label='Reset cards'
                        >
                            <RotateCcw className='h-4 w-4' />
                        </Button>
                    </div>
                </div>

            </motion.div>

            <div className='w-full flex'>
                <Button
                    className='font-medium ml-auto text-lg disabled:cursor-default flex gap-2 items-center'
                    onClick={generateOutlines}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <Loader className='h-4 w-4 animate-spin' />
                    ) : ("Genetate outline")}
                </Button>
            </div>

            <CardList outlines={outlines}
                      addOutline={addOutline}
                      addMultipleOutlines={addMultipleOutline}
                      editingCard={editingCard}  
                      selectedCard={selectedCard}
                      editText={editText}
                      onEditChange={setEditText}
                      onCardSelect={setSelectedCard}
                      setEditText={setEditText}
                      setEditingCard={setEditingCard}
                      setSelectedCard={setSelectedCard}
                      onCardDoubleClick={(id, title)=>{
                        setEditingCard(id)
                        setEditText(title)
                      }}
                      />

                      {outlines.length > 0 && 
                      <Button
                       className='w-full'
                       onClick={handleGenerate}
                       disabled={isGenerating }
                      >
                        {isGenerating ? (
                            <>
                            <Loader2 className='animate-spin mr-2' /> Generating...
                            </>
                        ): (
                            'Generate '
                        )}
                      </Button>}

                      {prompts?.length > 0 && <RecentPrompts />}
        </motion.div>
    )
}
export default CreativeAI
