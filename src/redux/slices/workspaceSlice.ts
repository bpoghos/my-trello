import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WorkspaceProps } from "../../app/App.interface";


const initialState: { workspace: WorkspaceProps[] } = {
    workspace: [
        {
            title: "firstWorkSpace",
            processes: [
                {
                    title: "Todo",
                    data: [

                        {
                            id: '2',
                            title: "Task",
                            description: "You must finish your todo next week",
                            comments: [
                                {
                                    id: '1',
                                    author: {
                                        profilePhoto: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                                        name: "John",
                                        surname: "Johnyan",
                                        comment: "I will do that!",
                                        date: "21.08.2023"

                                    },
                                    replies: [
                                        {
                                            id: '1',
                                            profilePhoto: "https://www.kindpng.com/picc/m/78-786678_avatar-hd-png-download.png",
                                            name: "Mike",
                                            surname: "Vazovski",
                                            reply: "OK, I will wait you!!!",
                                            date: "22.08.2023"

                                        }
                                    ]
                                }
                            ]
                        },

                    ]
                },
                {
                    title: "Doing",
                    data: [
                        {
                            id: '1',
                            title: "New Todo",
                            description: "You must finish your todo next week",
                            comments: [
                                {
                                    id: '1',
                                    author: {
                                        profilePhoto: "https://www.kindpng.com/picc/m/78-786678_avatar-hd-png-download.png",
                                        name: "Mike",
                                        surname: "Vazovski",
                                        comment: "I will do that!",
                                        date: "12.08.2023"
                                    },
                                    replies: [
                                        {
                                            id: '1',
                                            profilePhoto: "https://www.kindpng.com/picc/m/78-786678_avatar-hd-png-download.png",
                                            name: "Mike",
                                            surname: "Vazovski",
                                            reply: "OK, I will wait you!!!",
                                            date: "14.08.2023"

                                        },
                                        {
                                            id: '2',
                                            profilePhoto: "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
                                            name: "Lily",
                                            surname: "Showner",
                                            reply: "OK, I will wait you!!!",
                                            date: "15.08.2023"

                                        }
                                    ]
                                },
                                {
                                    id: '2',
                                    author: {
                                        profilePhoto: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                                        name: "John",
                                        surname: "Vazovski",
                                        comment: "I will do that!",
                                        date: "18.08.2023"

                                    },
                                    replies: [
                                        {
                                            id: '1',
                                            profilePhoto: "https://www.kindpng.com/picc/m/78-786678_avatar-hd-png-download.png",
                                            name: "Mike",
                                            surname: "Vazovski",
                                            reply: "OK, I will wait you!!!",
                                            date: "20.08.2023"

                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    title: "In testing",
                    data: []
                },
                {
                    title: "Done",
                    data: []
                },
            ]
        },
        {
            title: "secondWorkSpace",
            processes: []
        }
    ]
}

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        updateProcessesOrder: (state, action: PayloadAction<any>) => {
            const { singleWorkspace, newColumn } = action.payload;

            return {
                ...state,
                workspace: state.workspace.map((workspaceItem) => {
                    if (workspaceItem.title === singleWorkspace.title) {
                        return {
                            ...workspaceItem,
                            processes: workspaceItem.processes.map((process) =>
                                process.title === newColumn.title ? newColumn : process
                            ),
                        };
                    }
                    return workspaceItem;
                }),
            };
        },
        updateTasksOrder: (state, action: PayloadAction<any>) => {
            const { singleWorkspace, newDestinationColumn, newsourceProcess } = action.payload;

            return {
                ...state,
                workspace: state.workspace.map((workspaceItem) => {
                    if (workspaceItem.title === singleWorkspace.title) {
                        return {
                            ...workspaceItem,
                            processes: workspaceItem.processes.map((process) => {
                                if (process.title === newsourceProcess.title) return newsourceProcess;
                                if (process.title === newDestinationColumn.title) return newDestinationColumn;
                                return process;
                            }),
                        };
                    }
                    return workspaceItem;
                }),
            };
        },
    }
});
export const { updateProcessesOrder, updateTasksOrder } = workspaceSlice.actions

export default workspaceSlice.reducer;
