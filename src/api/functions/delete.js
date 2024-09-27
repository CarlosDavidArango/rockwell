import {collection, doc, deleteDoc} from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';
import { db } from '../firebase/firebase';

export const deleteData = async (collection, id) => {
    try{
        const docRef = doc(db, collection, id);
        await deleteDoc(docRef);
        return(true);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}