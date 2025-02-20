import { ChartLineIcon, Home, Settings, Trash } from "lucide-react";

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
        },{
            title: "Trash",
            url: "/trash",
            icon: Trash
        },{
            title: "Setting",
            url: "/setting",
            icon: Settings
        }
    ]
}