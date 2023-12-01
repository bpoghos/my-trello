import { DocumentData, DocumentReference, Query, addDoc, collection, doc, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { WorkspaceProps } from "../../app/App.interface";

export const getWorkspaceData = createAsyncThunk(
    "workspace/getWorkspaceData",
    async () => {
        const getData = await getDocs(collection(db, "workspace"))
        return getData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
)


export const getProcessData = createAsyncThunk(
    "processes/getWorkspaceData",

    async (singleWorkspace: any) => {

        const { id } = singleWorkspace

        const docRef = collection(db, "workspace", id, 'processes')
        const getData = await getDocs(docRef)
        if (getData.docs) {
            return getData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            return [];
        }

    }
)



export const getTasksData = createAsyncThunk(
    "tasks/getWorkspaceData",

    async ({ workspaceId, processId }: { workspaceId: any, processId: any }) => {

        const docRef = collection(db, "workspace", workspaceId, 'processes', processId, "tasks")
        const getData = await getDocs(docRef)
        if (getData.docs) {
            return getData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            return [];
        }

    }
)


export const addBoard = createAsyncThunk(
    "blog/createPost",
    async (postData: any) => {

        const docRef = await addDoc(collection(db, "workspace"), postData);
        return { id: docRef.id, ...postData };
    }
);


