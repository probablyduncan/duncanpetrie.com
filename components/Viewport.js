import { useEffect, useState, createContext, useRef } from "react";
import { Paragraph } from "./TextStyles";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { colors } from "@/data/colors";

// modeled after https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/

export const ViewportContext = createContext();

export function ViewportProvider({ children }) {

    // (my definition of mobile is < 1360px)
    const [mobile, setMobile] = useState();

    useEffect(() => {

        // if query matches, then we are on mobile
        const mobileQuery = window.matchMedia(`(max-width: 1360px)`);
    
        // function to update mobile state
        const updateMobile = () => setMobile(mobileQuery.matches);
    
        // update once at start
        updateMobile();
    
        // when the query updates, update state as well
        mobileQuery.addEventListener('change', updateMobile);
        return () => {
            mobileQuery.removeEventListener('change', updateMobile);
        }
    }, []);

    const dialogRef = useRef();
    const showHideDialog = (show) => {
        if (!dialogRef.current) return;
        
        document.body.style.backgroundColor = show ? colors.offWhite : colors.white
        
        if (show) dialogRef.current.showModal();
        else dialogRef.current.close();
    }

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', () => showHideDialog(false));

    useEffect(() => {

        showHideDialog(true);

        const dialogKeyHandler = (e) => {
            // if (e.code === "ArrowLeft") next(true);
            // if (e.code === "ArrowRight") next();
            if (e.code === "Escape") {
                showHideDialog(false)
            } else if (e.code === "KeyP") {
                showHideDialog(true);
            }
        }
        
        window.addEventListener("keydown", dialogKeyHandler);
        // window.addEventListener('scroll', dialogScrollHandler);
        // window.addEventListener('touchmove', () => showHideDialog());
        
        return () => {
            window.removeEventListener("keydown", dialogKeyHandler)
            // window.removeEventListener('scroll', dialogScrollHandler);
            // window.removeEventListener('touchmove', () => showHideDialog());
        };

    }, [])

    // return the context provider with mobile bool
    return (
        <ViewportContext.Provider value={{mobile}}>
            <dialog ref={dialogRef} style={{zIndex: 1000}}>
                <Paragraph>Heyyy.</Paragraph>
            </dialog>
            {children}
        </ViewportContext.Provider>
    );
}