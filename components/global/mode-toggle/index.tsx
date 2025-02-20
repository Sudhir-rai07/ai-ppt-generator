'use client'

import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(()=>{
        setMounted(true)
    }, [])

    if(!mounted){
        return null
    }
  return (
    <div>
        <Switch checked={theme === 'light'}
    onCheckedChange={()=> setTheme(theme === 'dark'? "light":"dark")}
    className='pl-1 w-12 h-8 bg-black/40  data-[state=checked]:bg-primary-80'
    aria-label='Toggle-dark-mode' />
    </div>
  )
}

export default ThemeSwitcher
