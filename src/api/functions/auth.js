import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth, db} from '../firebase/firebase';
import {doc, setDoc} from 'firebase/firestore';


export const singIn = async (email, password) => {
    try {
       const res = await signInWithEmailAndPassword(auth, email, password);
       return res.user
    } catch (error) {
        return error;
    }
}

export const logout = async () => {
    try {
        const res = await signOut(auth);
        return res;
    } catch (error) {
        return error;
    }
}
export const singUp = async (email, password, userData) => {
    try{
        const user = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', user.user.uid), {
            ...userData,
            uid: user.user.uid,
        });
        return "User created successfully";
    } catch (error) {
        return (error.message);
    }
}