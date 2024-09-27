import { doc, deleteDoc} from 'firebase/firestore';
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