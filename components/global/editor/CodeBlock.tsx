import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'

type Props = {
    code?: string
    language?: string
    onChange: (newCode: string) => void
    className?: string
}

const CodeBlock = ({
    onChange,
    className,
    code,
    language
}:Props) => {
    const {currentTheme} = useSlideStore()
  return (
    <pre className={cn('p-4 rounded-lg overflow-x-auto', className)}
    style={{
        backgroundColor: currentTheme.accentColor + '20'
    }}
    >
      <code className={`language-${language}`}>
        <textarea
        className='w-full h-full bg-transparent outline-none font-mono'
        value={code}
        onChange={(e)=> onChange(e.target.value)}
        style={{
            color:currentTheme.fontColor
        }}
        ></textarea>
      </code>
    </pre>
  )
}

export default CodeBlock
