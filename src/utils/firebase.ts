// Import the functions you need from the SDKs you need
import { collection, addDoc,getDocs,where, setDoc, getFirestore, query, serverTimestamp, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { DataProducts } from "../types/products";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOPhAvavMNND2shDVA68dZBDWokCQ3cQY",
  authDomain: "data-algoritmos-5e26d.firebaseapp.com",
  projectId: "data-algoritmos-5e26d",
  storageBucket: "data-algoritmos-5e26d.appspot.com",
  messagingSenderId: "1080782283856",
  appId: "1:1080782283856:web:b134f5162151770b379d55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getDataProducts(): Promise<DataProducts[]> {
    const dowloadProducts = collection(db, "u_products");
    const querySnapshot = await getDocs(query(dowloadProducts, orderBy("timestamp", "desc")));
    const DataProducts: DataProducts[] = [];
    querySnapshot.forEach((doc) => {
        const profile = doc.data() as DataProducts;
        DataProducts.push(profile);
    });
    return DataProducts;
}



export const addPost = async (post: any) => {
    try {
        const docRef = await addDoc(collection(db, "u_products"), {
            ...post,
            timestamp: serverTimestamp() // Utiliza serverTimestamp para registrar el tiempo de creación
        });
        console.log("Producto añadido con ID: ", docRef.id);
        return docRef.id; // Devuelve el ID del documento agregado
    } catch (error) {
        console.error("Error añadiendo producto: ", error);
        throw error;
    }
};



export default {
  addPost,
  getDataProducts,
}
