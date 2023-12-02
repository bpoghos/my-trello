import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";


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




export const addTask = createAsyncThunk(
    "task/addTask",
    async ({ payload, workspaceId, processId }: { payload: any; workspaceId: string; processId: string }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const docRef = await addDoc(collection(db, "workspace", workspaceId, "processes", processId, "tasks"), payload)
            return { id: docRef.id, ...payload }


        } catch (err) {
            console.log(err);

        }

    }
)




export const editTask = createAsyncThunk(
    "task/editTask",
    async ({
        payload,
        workspaceId,
        processId,
        taskId,
        sourceProcessId,
        destinationProcessId,
        sourceIndex,
        destinationIndex,
    }: {
        payload: any;
        workspaceId: string;
        processId?: string;
        taskId: any;
        sourceProcessId?: string;
        destinationProcessId?: string;
        sourceIndex?: number;
        destinationIndex?: number;
    }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            if (processId) {
                const taskRef = doc(db, 'workspace', workspaceId, 'processes', processId, "tasks", taskId);
                await setDoc(taskRef, payload, { merge: true });
                return { processId, ...payload };
            }



            if (sourceProcessId && destinationProcessId) {
                if (sourceProcessId === destinationProcessId) {
                    const tasksRef = collection(db, 'workspace', workspaceId, 'processes', sourceProcessId, 'tasks');
                    const snapshot = await getDocs(tasksRef);

                    const tasks = snapshot.docs.map(doc => doc.data());

                    tasks.splice(sourceIndex!, 1);
                    tasks.splice(destinationIndex!, 0, { ...payload });

                    tasks.forEach(async (task, index) => {
                        console.log(task);

                        const taskRef = doc(db, 'workspace', workspaceId, 'processes', sourceProcessId, 'tasks', task.id);
                        await setDoc(taskRef, task, { merge: true });
                    });

                    return { processId: destinationProcessId, ...payload };
                }

                const taskRef = doc(db, 'workspace', workspaceId, 'processes', sourceProcessId, "tasks", taskId);
                await setDoc(taskRef, payload, { merge: true });

                if (sourceProcessId !== undefined && destinationProcessId !== undefined) {
                    if (sourceProcessId !== destinationProcessId) {
                        const sourceTaskRef = doc(db, 'workspace', workspaceId, 'processes', sourceProcessId, "tasks", taskId);
                        await deleteDoc(sourceTaskRef);
                        const destinationTaskRef = doc(db, 'workspace', workspaceId, 'processes', destinationProcessId, "tasks", taskId);
                        await setDoc(destinationTaskRef, payload, { merge: true });
                    }
                }
                return { processId: destinationProcessId, ...payload };
            }
            console.error('Error: Either processId or (sourceProcessId and destinationProcessId) must be provided.');
            throw new Error('Invalid parameters.');
        } catch (err) {
            console.log(err);
        }
    }
);
