import { collection, getDocs } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";


export const getPost = createAsyncThunk(
    "post/getPost",
    async () => {
        const result = await getDocs(collection(db, "posts"))
        console.log('resresres');
        return result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
)


const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: {
        [getPost.pending as any]: (state) => {
            state.loading = true
        },
        [getPost.fulfilled as any]: (state, action) => {
            state.loading = false
            state.posts = action.payload
        },
        [getPost.rejected as any]: (state, action) => {
            console.log(action.error.message);

            state.loading = false
            state.error = action.error.message
        }
    }
})


export default postSlice.reducer