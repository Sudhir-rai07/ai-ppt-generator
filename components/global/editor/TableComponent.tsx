'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useSlideStore } from '@/store/useSlideStore'
import React, { useEffect, useState } from 'react'

interface TableComponentProps {
    content: string[][]
    onChange: (newContent: string[][]) => void
    isPreview?: boolean
    isEditable?: boolean
    initialRowSize?: number
    initialColSize?: number
}

const TableComponent: React.FC<TableComponentProps> = ({
    content,
    onChange,
    initialColSize,
    initialRowSize,
    isEditable,
    isPreview
}) => {

    const { currentTheme } = useSlideStore()

    const [tableData, setTableData] = useState<string[][]>(() => {
        if (content.length === 0 || content[0].length === 0) {
            return Array(initialRowSize)
                .fill(Array(initialColSize)
                    .fill(''))
        }
        return content
    })
    const [colSizes, setColSizes] = useState<number[]>([])
    const [rowSizes, setRowSizes] = useState<number[]>([])

    const handleResize = (index: number, newSize: number) => {
        if (!isEditable) return
        const newSizes = [...colSizes]
        newSizes[index] = newSize
        setColSizes(newSizes)
    }

    const updateCell = (rowIndex: number, colIndex: number, value: string) => {
        if (!isEditable) return
        const newData = tableData.map((row, rIndex) =>
            rIndex === rowIndex
                ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
                : row
        )
        setTableData(newData)
        onChange(newData)
    }

    useEffect(()=>{
        setRowSizes(new Array(tableData.length).fill(100/tableData.length))
        setColSizes(new Array(tableData[0].length).fill(100/tableData.length))
    }, [tableData])

    if (isPreview) {
        return (
            <div className='w-full overflow-x-auto text-xs'>
                <table className='w-full'>
                    <thead className="">
                        <tr>
                            {tableData.map((cell, index) => (
                                <th className="p-2 border" key={index} style={{
                                    width: `${colSizes[index]}%`
                                }}>
                                    {cell || 'Type here'}
                                </th>
                            ))}
                        </tr>
                    </thead>


                    <tbody>
                        {tableData.slice(1).map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                style={{
                                    height: `${rowSizes[rowIndex + 1]}%`
                                }}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td className="p-2 border"
                                        key={cellIndex}
                                    >
                                        {cell || 'Type here'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className='h-full w-full relative'
            style={{
                background: currentTheme.gradientBackground || currentTheme.backgroundColor,
                borderRadius: '8px'
            }}
        >
            <ResizablePanelGroup
                direction='vertical'
                className={`h-full w-full rounded-lg border ${initialColSize === 2
                    ? 'min-h-[100px]'
                    : initialColSize === 3
                        ? 'min-h-[150px]'
                        : initialColSize === 4
                            ? 'min-h-[200px]'
                            : 'min-h-[100px]'
                    }`}

                onLayout={(sizes) => setRowSizes(sizes)}
            >
                {tableData.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {rowIndex > 0 && <ResizableHandle />}
                        <ResizablePanelGroup
                            direction='horizontal'
                            onLayout={(sizes) => setColSizes(sizes)}
                            className='w-full h-full'
                        >
                            {
                                row.map((cell, colIndex) => (
                                    <React.Fragment key={colIndex}>
                                        {colIndex > 0 && <ResizableHandle />}
                                        <ResizablePanel
                                            defaultSize={colSizes[colIndex]}
                                            onResize={(size) => handleResize(colIndex, size)}
                                            className='h-full w-full min-h-9'
                                        >
                                            <div className="relative w-full h-full min-h-3">
                                                <input value={cell}
                                                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}

                                                    className='w-full h-full p-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md'
                                                    style={{ color: currentTheme.fontColor }}
                                                    placeholder='Type here'
                                                    readOnly={!isEditable}
                                                />
                                            </div>
                                        </ResizablePanel>
                                    </React.Fragment>
                                ))
                            }
                        </ResizablePanelGroup>
                    </React.Fragment>
                ))}
            </ResizablePanelGroup>
        </div>
    )
}

export default TableComponent
