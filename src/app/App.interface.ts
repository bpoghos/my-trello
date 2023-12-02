import { User } from "firebase/auth";

export interface TaskProps {
    id: string;
    title: string;
    description: string;
    comments: CommentProps[];
}

export interface AuthorProps {
    profilePhoto: string;
    name: string;
    surname: string;
    comment: string;
    date: string
}

export interface CommentProps {
    id: string;
    userId: string;
    userPhoto: string;
    userName: string;
    comment: string;
    date: number
}

export interface RepliesProps {
    id: string;
    profilePhoto: string;
    name: string;
    surname: string;
    reply: string;
    date: string
}

export interface ProcessProps {
    title: string;
    id: string,
    tasks: TaskProps[]
}

export interface WorkspaceProps {
    title: string;
    id: string;
    image: string;
    processes: ProcessProps[]
}


export interface InitialStateType {
    profile: User | null;
    loading: boolean;
    error: string | null
}
