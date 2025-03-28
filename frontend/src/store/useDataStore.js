import { create } from "zustand";
import { CircleUser, MessagesSquare, Users, Settings } from "lucide-react";

const useDataStore = create((set,get) => ({
    upperMenuItems: {
        Profile: {
            id: 1,
            icon: CircleUser,
            name: "Profile",
            active: true,  // Initially active
        },
        Chats: {
            id: 2,
            icon: MessagesSquare,
            name: "Chats",
            active: false,
        },
        Groups: {
            id: 3,
            icon: Users,
            name: "Groups",
            active: false,
        },
        Settings: {
            id: 4,
            icon: Settings,
            name: "Settings",
            active: false,
        },
    },

    // Function to update active state
    setActiveMenu: (menuName) => set((state) => {
        const updatedMenuItems = Object.keys(state.upperMenuItems).reduce((acc, key) => {
            acc[key] = {
                ...state.upperMenuItems[key],
                active: key === menuName,  // Activate only the selected menu
            };
            return acc;
        }, {});

        return { upperMenuItems: updatedMenuItems };
    }),
}));

export default useDataStore;
