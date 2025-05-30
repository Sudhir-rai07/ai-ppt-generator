'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { LayoutSlides, Slide } from '@/lib/types'
import { useSlideStore } from '@/store/useSlideStore'
import { useDrag, useDrop } from 'react-dnd'
import { MasterRecursiveComponent } from './MasterRecursiveComponent'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { v4 } from 'uuid'
import { updateSlides } from '@/actions/project'



interface DropZoneProps {
    index: number;
    onDrop: (
        item: {
            type: string;
            layoutType: string;
            component: LayoutSlides;
            index: number;
        },
        dropIndex: number
    ) => void
    isEditable: boolean
}
export const DropZone: React.FunctionComponent<DropZoneProps> = ({
    index, onDrop, isEditable
}) => {

    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: ["SLIDE", 'layout'],
        drop: (item: {
            type: string;
            layoutType: string;
            component: LayoutSlides;
            index: number;
        }) => {
            onDrop(item, index)
        },
        canDrop: () => isEditable,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        })
    })

    if (!isEditable) return null

    return (
         <div
        ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
        className={cn(
            'h-4 my-2 rounded-md transition-all duration-200',
            isOver && canDrop ? 'border-green-500 bg-green-100' : 'border-gray-300',
            canDrop ? 'border-blue-300' : ''
        )}
    >
        {isOver && canDrop && (
            <div className='h-full flex items-center justify-center text-green-600'>
                Drop Here
            </div>
        )}
    </div>
    )
}


interface DraggableSlideProps {
    slide: Slide;
    index: number;
    moveSlide: (dragIndex: number, hoverIndex: number) => void
    handleDelete: (id: string) => void
    isEditable: boolean
}
export const DraggableSlide: React.FC<DraggableSlideProps> = ({
    slide,
    index,
    isEditable,
    handleDelete,
    moveSlide,
}) => {

    const ref = useRef(null)
    const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } = useSlideStore()
    const [{ isDragging }, drag] = useDrag({
        type: "SLIDE",
        item: {
            index,
            type: "SLIDE",
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: isEditable
    })

    const [, drop] = useDrop({
        accept: ["SLIDE", "layout"],
        hover(item: { index: number, type: string }) {
            if (!ref.current || !isEditable) {
                return
            }

            const dragIndex = item.index
            const hoverIndex = index

            if (item.type === 'SLIDE') {
                if (dragIndex === hoverIndex) {
                    return;
                }
                moveSlide(dragIndex, hoverIndex)
                item.index = hoverIndex
            }
        }
    })

    drag(drop(ref))

    const handleContentChange = (
        contentId: string, 
        newContent: string | string[] | string[][]
    ) => {
        if (isEditable) {
            updateContentItem(slide.id, contentId, newContent)
        }
    }
    return (
        <div ref={ref} className={cn(
            'w-full rounded-lg shadow-lg relative p-0  min-h-[400px] max-h-[800px]', 'shadow-lg transition-shadow duration-300', 'flex flex-col',
            index === currentSlide ? 'ring-2 ring-blue-500 ring-offset-2' : '',
            slide.className,
            isDragging ? "opacity-50" : "opacity-100"
        )}
            style={{
                backgroundImage: currentTheme.gradientBackground
            }}
            onClick={() => setCurrentSlide(index)}
        >
            <div className='h-full w-full flex-grow overflow-hidden'>
                <MasterRecursiveComponent
                    content={slide.content}
                    isPreview={false}
                    slideId={slide.id}
                    isEditable={isEditable}
                    onContentChange={handleContentChange}
                    index={index}
                />
            </div>

            {isEditable && (
                <Popover>
                    <PopoverTrigger
                        asChild
                        className='absolute top-2 left-2'>
                        <Button
                            size={'sm'}
                            variant={'outline'}
                        >
                            <EllipsisVertical className='w-5 h-5' />
                            <span className='sr-only'>Slide options</span>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className='w-fit p-0'>
                        <div className='flex space-x-2'>
                            <Button
                                variant={'ghost'}
                                onClick={() => handleDelete(slide.id)}
                            >
                                <Trash className="h-5 w-5 text-red-500" />
                                <span className="sr-only">Delete slide</span>

                            </Button>
                        </div>

                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}

type Props = {
    isEditable: boolean
}
const Editor = ({ isEditable }: Props) => {

    const {
        getOrderedSlides,
        removeSlide,
        addSlideAtIndex,
        reorderSlides,
        currentSlide,
        slides,
        project
    } = useSlideStore()

    const orderedSlides = getOrderedSlides()
    const slideRef = useRef<(HTMLDivElement | null)[]>([])

    const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

    const [loading, setLoading] = useState(false)

    console.log("ORDERED SLIDES ::", orderedSlides)

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        if (!isEditable) {
            reorderSlides(dragIndex, hoverIndex)
        }
    }

    const handleDrop = (item: {
        type: string;
        layoutType: string;
        component: LayoutSlides;
        index?: number;
    }, dropIndex: number) => {
        if (!isEditable) return
        if (item.type === "layout") {
            addSlideAtIndex(
                {
                    ...item.component,
                    id: v4(),
                    slideOrder: dropIndex,
                },
                dropIndex
            )
        } else if (item.type === "SLIDE" && item.index !== undefined) {
            moveSlide(item.index, dropIndex)
        }
    }

    const handleDelete = (id: string) => {
        if (isEditable) {
            console.log("Deleting ", id)
            removeSlide(id)
        }
    }


    useEffect(() => {
        if (slideRef.current[currentSlide]) {
            slideRef.current[currentSlide]?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }
    }, [currentSlide])

    useEffect(() => {
        if (typeof window !== 'undefined') setLoading(false)
    }, [])

    const saveSlides = useCallback(() => {
        if (isEditable && project) {
            ; (async () => {
                await updateSlides(project.id, JSON.parse(JSON.stringify(slides)))
            })()
        }
    }, [isEditable, project, slides])

    useEffect(() => {
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current)
        }
        if (isEditable) {
            autoSaveTimerRef.current = setTimeout(() => {
                saveSlides()
            }, 2000)
        }
        return () => {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current)
            }
        }
    }, [slides, isEditable,saveSlides, project])
    return (
        <div className='flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20'>
            {loading ?
                <div className='w-full px-4 flex flex-col space-y-6'>
                    <Skeleton className='h-52 w-full' />
                    <Skeleton className='h-52 w-full' />
                    <Skeleton className='h-52 w-full' />
                </div> :
                <div>
                    <ScrollArea className='flex-1 mt-8'>
                        <div className="px-4 space-y-4 pt-2">
                            {isEditable &&
                                <DropZone
                                    index={0}
                                    onDrop={handleDrop}
                                    isEditable={isEditable}
                                />}

                            {orderedSlides.map((slide: Slide, index: number) => (
                                <React.Fragment key={slide.id}>
                                    <DraggableSlide
                                        slide={slide}
                                        index={index}
                                        moveSlide={moveSlide}
                                        handleDelete={handleDelete}
                                        isEditable={isEditable}
                                    />

                                    {isEditable &&
                                        <DropZone
                                            index={index + 1}
                                            onDrop={handleDrop}
                                            isEditable={isEditable}
                                        />}
                                </React.Fragment>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            }
        </div>
    )
}

export default Editor
