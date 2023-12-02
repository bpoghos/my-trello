import { addDoc, collection, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";

export const getWorkspaceData: any = createAsyncThunk(
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



export const addBoard = createAsyncThunk(
    "blog/createPost",
    async (postData: any) => {

        const docRef = await addDoc(collection(db, "workspace"), postData);
        return { id: docRef.id, ...postData };
    }
);


