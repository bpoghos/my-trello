import { addDoc, collection, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { WorkspaceProps } from "../../app/App.interface";

export const getWorkspaceData = createAsyncThunk(
    "workspace/getWorkspaceData",
    async () => {
        const getData = await getDocs(collection(db, "workspace"))
        console.log(getData.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        return getData.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    }
)


export const addBoard = createAsyncThunk(
    "blog/createPost",
    async (createBoards: WorkspaceProps) => {
        const docRef = await addDoc(collection(db, "workspace"), createBoards);
        return { id: docRef.id, ...createBoards };
    }
);


