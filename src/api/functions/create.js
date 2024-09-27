import { doc, setDoc} from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';
import { db } from '../firebase/firebase';

const getUUID = () => {
    return uuidv4();
}

export const create = async (collection, data) => {
    const id = getUUID();
    try {
        const docRef = doc(db, collection, id);
        await setDoc(docRef, {
            id,
            ...data
        });
        return("Document written");

    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
