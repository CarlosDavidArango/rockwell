import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../api/firebase/firebase";

const UserContext = createContext();



export const useAuth = () => {
    return useContext(UserContext);
};

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setIsLoggedIn(true);
                const unsubscribeSnapshot = onSnapshot(doc(db, 'users', currentUser.uid), (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setRole(docSnapshot.data().role);
                    } else {
                        console.log("No such document!");
                    }
                });
                return unsubscribeSnapshot; // Retorna la función para desuscribirse de onSnapshot al desmontar
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe(); // Desuscribirse de onAuthStateChanged al desmontar
    }, []);

    return (
        <UserContext.Provider value={{isLoggedIn, role}}>
            {children}
        </UserContext.Provider>
    );
}