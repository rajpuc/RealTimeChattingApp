import {create} from "zustand";

const useThemeStore = create((set,get)=>({
    darkMode:localStorage.getItem("theme") === "dark",
    setDarkMode: ()=>{
        set({darkMode:!get().darkMode});
    },
}));

export default useThemeStore;