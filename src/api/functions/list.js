import {collection, doc, getDocs} from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';
import { db } from '../firebase/firebase';

export const list = async (newCollection) => {
    try{
        const newData = []
        const querySnapshot = await getDocs(collection(db, newCollection));
        querySnapshot.forEach((doc) => {
            newData.push({ id: doc.id, ...doc.data()});
        });
        return newData;
    } catch (error) {
        console.error("Error getting documents: ", error)
    }
}