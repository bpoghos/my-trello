import { addDoc, collection, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";

export const getCommentsData = createAsyncThunk(
    "comments/getCommentsData",

    async ({ workspaceId, processId, taskId }: { workspaceId: any, processId: any, taskId: any }) => {
        const docRef = collection(db, "workspace", workspaceId, 'processes', processId, "tasks", taskId, "comments")
        const getData = await getDocs(docRef)
        if (getData.docs) {
            return getData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            return [];
        }

    }
)


export const addcomment = createAsyncThunk(
    "comments/addcomment",
    async ({ payload, workspaceId, processId, taskId }: { payload: any; workspaceId: string; processId: string, taskId: string }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const docRef = await addDoc(collection(db, "workspace", workspaceId, "processes", processId, "tasks", taskId, "comments"), payload)
            return { id: docRef.id, ...payload }


        } catch (err) {
            console.log(err);

        }

    }
)


