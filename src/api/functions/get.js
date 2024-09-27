import { doc, getDoc} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const get = async (collection, id) => {
    try{
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {id: docSnap.id, ...docSnap.data()};
        } else {
            return ("No such document!");
        }
    } catch (error) {
        console.error("Error getting document: ", error);
    }
}