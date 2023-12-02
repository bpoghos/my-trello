import { collection, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";

export const getWorkspaceData: any = createAsyncThunk(
    "workspace/getWorkspaceData",
    async () => {
        const getData = await getDocs(collection(db, "workspace"))
        return getData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }
)




