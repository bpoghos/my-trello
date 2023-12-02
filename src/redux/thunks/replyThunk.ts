import { addDoc, collection, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";

export const getRepliesesData = createAsyncThunk(
    "replieses/getRepliesesData",

    async ({ workspaceId, processId, taskId, commentId }: { workspaceId: any, processId: any, taskId: any, commentId: any }) => {

        const docRef = collection(db, "workspace", workspaceId, 'processes', processId, "tasks", taskId, "comments", commentId, "replieses")
        const getData = await getDocs(docRef)
        if (getData.docs) {
            return getData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            return [];
        }

    }
)


export const addReply = createAsyncThunk(
    "reply/addReply",
    async ({ payload, workspaceId, processId, taskId, commentId }: { payload: any; workspaceId: string; processId: string, taskId: string, commentId: string }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const docRef = await addDoc(collection(db, "workspace", workspaceId, "processes", processId, "tasks", taskId, "comments", commentId, "replieses"), payload)
            return { id: docRef.id, ...payload }


        } catch (err) {
            console.log(err);

        }

    }
)
