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
      name: "Default",
      fontFamily: "'Inter', sans-serif",
      fontColor: "#1A1A1A",
      backgroundColor: "#F8FAFC",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#3B82F6",
      navbarColor: "#FFFFFF",
      sidebarColor: "#F1F5F9",
      type: "light",
    },
    {
      name: "Dark Elegance",
      fontFamily: "'Playfair Display', serif",
      fontColor: "#F8FAFC",
      backgroundColor: "#0F172A",
      slideBackgroundColor: "#1E293B",
      accentColor: "#FCD34D",
      gradientBackground: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      navbarColor: "#1E293B",
      sidebarColor: "#0F172A",
      type: "dark",
    },
    {
      name: "Nature Fresh",
      fontFamily: "'Montserrat', sans-serif",
      fontColor: "#064E3B",
      backgroundColor: "#ECFDF5",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#059669",
      gradientBackground: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
      navbarColor: "#D1FAE5",
      sidebarColor: "#ECFDF5",
      type: "light",
    },
    {
      name: "Tech Vibrant",
      fontFamily: "'Roboto', sans-serif",
      fontColor: "#F1F5F9",
      backgroundColor: "#312E81",
      slideBackgroundColor: "#4338CA",
      accentColor: "#FB7185",
      gradientBackground: "linear-gradient(135deg, #312E81 0%, #4338CA 100%)",
      navbarColor: "#4338CA",
      sidebarColor: "#312E81",
      type: "dark",
    },
    {
      name: "Pastel Dream",
      fontFamily: "'Lato', sans-serif",
      fontColor: "#6B21A8",
      backgroundColor: "#FAF5FF",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#C084FC",
      gradientBackground: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)",
      navbarColor: "#F3E8FF",
      sidebarColor: "#FAF5FF",
      type: "light",
    },
    {
      name: "Ocean Breeze",
      fontFamily: "'Open Sans', sans-serif",
      fontColor: "#ECFEFF",
      backgroundColor: "#164E63",
      slideBackgroundColor: "#155E75",
      accentColor: "#22D3EE",
      gradientBackground: "linear-gradient(135deg, #164E63 0%, #155E75 100%)",
      navbarColor: "#155E75",
      sidebarColor: "#164E63",
      type: "dark",
    },
    {
      name: "Sunset Glow",
      fontFamily: "'Merriweather', serif",
      fontColor: "#7C2D12",
      backgroundColor: "#FFF7ED",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#FB923C",
      gradientBackground: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
      navbarColor: "#FFEDD5",
      sidebarColor: "#FFF7ED",
      type: "light",
    },
    {
      name: "Minimalist Mono",
      fontFamily: "'IBM Plex Mono', monospace",
      fontColor: "#18181B",
      backgroundColor: "#FFFFFF",
      slideBackgroundColor: "#FAFAFA",
      accentColor: "#52525B",
      navbarColor: "#FAFAFA",
      sidebarColor: "#FFFFFF",
      type: "light",
    },
    {
      name: "Neon Nights",
      fontFamily: "'Orbitron', sans-serif",
      fontColor: "#E4E4E7",
      backgroundColor: "#09090B",
      slideBackgroundColor: "#18181B",
      accentColor: "#14B8A6",
      gradientBackground: "linear-gradient(135deg, #09090B 0%, #18181B 100%)",
      navbarColor: "#18181B",
      sidebarColor: "#09090B",
      type: "dark",
    },
    {
      name: "Earthy Tones",
      fontFamily: "'Nunito', sans-serif",
      fontColor: "#78350F",
      backgroundColor: "#FFFBEB",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#D97706",
      gradientBackground: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
      navbarColor: "#FEF3C7",
      sidebarColor: "#FFFBEB",
      type: "light",
    },
    {
      name: "Retro Pop",
      fontFamily: "'Pacifico', cursive",
      fontColor: "#FDF4FF",
      backgroundColor: "#86198F",
      slideBackgroundColor: "#A21CAF",
      accentColor: "#FDF4FF",
      gradientBackground: "linear-gradient(135deg, #86198F 0%, #A21CAF 100%)",
      navbarColor: "#A21CAF",
      sidebarColor: "#86198F",
      type: "dark",
    },
    {
      name: "Zen Garden",
      fontFamily: "'Noto Serif JP', serif",
      fontColor: "#064E3B",
      backgroundColor: "#ECFDF5",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#059669",
      gradientBackground: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
      navbarColor: "#D1FAE5",
      sidebarColor: "#ECFDF5",
      type: "light",
    },
    {
      name: "Arctic Frost",
      fontFamily: "'Quicksand', sans-serif",
      fontColor: "#0C4A6E",
      backgroundColor: "#F0F9FF",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#0EA5E9",
      gradientBackground: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
      navbarColor: "#E0F2FE",
      sidebarColor: "#F0F9FF",
      type: "light",
    },
    {
      name: "Vintage Warmth",
      fontFamily: "'Libre Baskerville', serif",
      fontColor: "#78350F",
      backgroundColor: "#FFFBEB",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#D97706",
      gradientBackground: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
      navbarColor: "#FEF3C7",
      sidebarColor: "#FFFBEB",
      type: "light",
    },
    {
      name: "Cosmic Delight",
      fontFamily: "'Space Grotesk', sans-serif",
      fontColor: "#F5F3FF",
      backgroundColor: "#4C1D95",
      slideBackgroundColor: "#5B21B6",
      accentColor: "#A78BFA",
      gradientBackground: "linear-gradient(135deg, #4C1D95 0%, #5B21B6 100%)",
      navbarColor: "#5B21B6",
      sidebarColor: "#4C1D95",
      type: "dark",
    },
    {
      name: "Midnight Bloom",
      fontFamily: "'Poppins', sans-serif",
      fontColor: "#FDF2F8",
      backgroundColor: "#831843",
      slideBackgroundColor: "#9D174D",
      accentColor: "#F472B6",
      gradientBackground: "linear-gradient(135deg, #831843 0%, #9D174D 100%)",
      navbarColor: "#9D174D",
      sidebarColor: "#831843",
      type: "dark",
    },
    {
      name: "Coral Sunset",
      fontFamily: "'Raleway', sans-serif",
      fontColor: "#831843",
      backgroundColor: "#FDF2F8",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#EC4899",
      gradientBackground: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
      navbarColor: "#FCE7F3",
      sidebarColor: "#FDF2F8",
      type: "light",
    },
    {
      name: "Emerald City",
      fontFamily: "'Montserrat', sans-serif",
      fontColor: "#F0FDF4",
      backgroundColor: "#064E3B",
      slideBackgroundColor: "#065F46",
      accentColor: "#34D399",
      gradientBackground: "linear-gradient(135deg, #064E3B 0%, #065F46 100%)",
      navbarColor: "#065F46",
      sidebarColor: "#064E3B",
      type: "dark",
    },
    {
      name: "Lavender Mist",
      fontFamily: "'Nunito', sans-serif",
      fontColor: "#5B21B6",
      backgroundColor: "#F5F3FF",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#8B5CF6",
      gradientBackground: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
      navbarColor: "#EDE9FE",
      sidebarColor: "#F5F3FF",
      type: "light",
    },
    {
      name: "Golden Hour",
      fontFamily: "'Source Sans Pro', sans-serif",
      fontColor: "#92400E",
      backgroundColor: "#FFFBEB",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#F59E0B",
      gradientBackground: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
      navbarColor: "#FEF3C7",
      sidebarColor: "#FFFBEB",
      type: "light",
    },
    {
      name: "Arctic Aurora",
      fontFamily: "'Roboto', sans-serif",
      fontColor: "#F0F9FF",
      backgroundColor: "#0C4A6E",
      slideBackgroundColor: "#075985",
      accentColor: "#38BDF8",
      gradientBackground: "linear-gradient(135deg, #0C4A6E 0%, #075985 100%)",
      navbarColor: "#075985",
      sidebarColor: "#0C4A6E",
      type: "dark",
    },
    {
      name: "Sakura Blossom",
      fontFamily: "'Noto Sans JP', sans-serif",
      fontColor: "#831843",
      backgroundColor: "#FDF2F8",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#EC4899",
      gradientBackground: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
      navbarColor: "#FCE7F3",
      sidebarColor: "#FDF2F8",
      type: "light",
    },
    {
      name: "Urban Jungle",
      fontFamily: "'Karla', sans-serif",
      fontColor: "#064E3B",
      backgroundColor: "#ECFDF5",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#059669",
      gradientBackground: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
      navbarColor: "#D1FAE5",
      sidebarColor: "#ECFDF5",
      type: "light",
    },
    {
      name: "Cosmic Latte",
      fontFamily: "'Work Sans', sans-serif",
      fontColor: "#78350F",
      backgroundColor: "#FFFBEB",
      slideBackgroundColor: "#FFFFFF",
      accentColor: "#D97706",
      gradientBackground: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
      navbarColor: "#FEF3C7",
      sidebarColor: "#FFFBEB",
      type: "light",
    },
    {
      name: "Neon Cyberpunk",
      fontFamily: "'Rajdhani', sans-serif",
      fontColor: "#F0FDFA",
      backgroundColor: "#134E4A",
      slideBackgroundColor: "#115E59",
      accentColor: "#2DD4BF",
      gradientBackground: "linear-gradient(135deg, #134E4A 0%, #115E59 100%)",
      navbarColor: "#115E59",
      sidebarColor: "#134E4A",
      type: "dark",
    },
  ];

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