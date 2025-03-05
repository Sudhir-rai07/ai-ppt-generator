export interface Slide {
    id: string;
    slidename: string;
    type: string;
    content: ContentItem;
    slideOrder: number;
    className?: string;
}

export type ContentType = 
    | 'column'
    | 'resixable-column'
    | 'text'
    | 'paragraph'
    | 'image'
    | 'table'
    | 'multicolumn'
    | 'blank'
    | 'imageAndText'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'title'
    | 'heading4'
    | 'table'
    | 'blockquote'
    | 'numberedList'
    | 'bulletedList'
    | 'code'
    | 'link'
    | 'quote'
    | 'divider'
    | 'calloutBox'
    | 'todoList'
    | 'bulletList'
    | 'codeBlock'
    | 'customButton'
    | 'table'
    | 'tableOfContents'

export interface ContentItem {
    id: string
    type: ContentType;
    name: string;
    content: ContentItem[] | string | string []
    initialRows: number
    initialColumns?: number
    restrictToDrop?: boolean
    columns?: number
    placeholder?: string
    className?: string
    alt?:string
    callOutType?:'success'| 'warning' | 'info' | 'question' | 'caution'
    link?: string
    code?: string
    language?: string
    bgColor?: string
    isTransparent?: boolean
}

export interface Theme {
    name: string;
    fontFamily: string;
    fontColor: string;
    backgroundColor: string;
    slideBackgroundColor: string;
    accentColor: string;
    gradientBackground?: string;
    sidebarColor?: string;
    navbarColor: string;
    type: 'light' | 'dark';
}

export interface OutlineCard {
    title: string;
    id: string;
    order: number
}