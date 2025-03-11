import { ChartLineIcon, Home, Settings, Trash } from "lucide-react";
import { Theme } from "./types";

export const data = {
    user: {
        name: "ShadCN",
        email: "email#email",
        avatar: '/avatar/shadcn.jpg'
    },

    navMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: Home
        }, {
            title: "Templates",
            url: "/templates",
            icon: ChartLineIcon
        }, {
            title: "Trash",
            url: "/trash",
            icon: Trash
        }, {
            title: "Setting",
            url: "/setting",
            icon: Settings
        }
    ]
}


export const containerVarients = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}


export const itemVarients = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
}


export const themes: Theme[] = [
    {
        name: 'Default',
        fontFamily: "'Inter', sans-sarif",
        fontColor: '#000000',
        backgroundColor: '#f0f0f0',
        slideBackgroundColor: '#ffffff',
        accentColor: '#3b82f6',
        navbarColor: '#ffffff',
        sidebarColor: '#f0f0f0',
        type: 'light',

    }
]

export const CreatePageCard = [
    {
        title: "Use a",
        highlightedText: "Template",
        description: "Write a prompt and leave everything else for us to handle",
        type: "template"
    }, {
        title: "Generate with",
        highlightedText: "Creative AI",
        description: "Write a prompt and leave everything else for us to handle",
        type: "creative-ai",
        highlight: true
    }, {
        title: "Start from",
        highlightedText: "Scratch",
        description: "Write a prompt and leave everything else for us to handle",
        type: "create-scratch",
    },
]