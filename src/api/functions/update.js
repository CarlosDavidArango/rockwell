import {collection, doc, updateDoc} from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';
import { db } from '../firebase/firebase';

export const update = async (collection, id, data) => {
    try{
        const docRef = doc(db, collection, id);
        await updateDoc(docRef,{
            id : id,
            ...data
        });
        return ("Document successfully updated!");
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}