import { useEffect, useState, createContext, useRef } from "react";
import { Paragraph } from "./TextStyles";

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
    useEffect(() => {

        dialogRef.current.showModal();

        const showHideDialog = (on) => {
            if (on) dialogRef.current.showModal(); 
            else dialogRef.current.close();
        }

        const dialogKeyHandler = (e) => {
            // if (e.code === "ArrowLeft") next(true);
            // if (e.code === "ArrowRight") next();
            if (e.code === "Escape") showHideDialog();
            else if (e.code === "KeyP") showHideDialog(true);
        }
        
        window.addEventListener("keydown", dialogKeyHandler);
        window.addEventListener('wheel', () => showHideDialog());
        window.addEventListener('touchmove', () => showHideDialog());
        
        return () => {
            window.removeEventListener("keydown", dialogKeyHandler)
            window.removeEventListener('wheel', () => showHideDialog());
            window.removeEventListener('touchmove', () => showHideDialog());
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