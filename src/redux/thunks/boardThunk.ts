import { addDoc, collection } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";




export const addBoard = createAsyncThunk(
    "blog/createPost",
    async (postData: any) => {

        const docRef = await addDoc(collection(db, "workspace"), postData);
        return { id: docRef.id, ...postData };
    }
);


