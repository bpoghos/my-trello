import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";

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



export const addProcess: any = createAsyncThunk(
    'process/addProcess',
    async ({ payload, id }: { payload: any, id: any }) => {

        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const docRef = await addDoc(collection(db, "workspace", id, "processes"), payload)
            return { id: docRef.id, ...payload }


        } catch (err) {
            console.log(err);

        }
    }
)



export const editProcess = createAsyncThunk(
    'process/editProcess',
    async ({ payload, workspaceId, processId }: { payload: any; workspaceId: string; processId: string }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const processRef = doc(db, 'workspace', workspaceId, 'processes', processId);
            await setDoc(processRef, payload, { merge: true });
            return { processId, ...payload };
        } catch (err) {
            console.error('Error editing process:', err);
            throw err;
        }
    }
);



export const deleteProcess = createAsyncThunk(
    'blog/deleteProcess',
    async ({ workspaceId, processId }: { workspaceId: string; processId: string }) => {
        try {
            const processRef = doc(db, 'workspace', workspaceId, 'processes', processId);
            await deleteDoc(processRef);

            return { workspaceId, processId };
        } catch (err) {
            console.error('Error deleting process:', err);
            throw err;
        }
    }
);

