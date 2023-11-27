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
    author: AuthorProps;
    replies: RepliesProps[]
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
    data: TaskProps[]
}

export interface WorkspaceProps {
    title: string;
    processes: ProcessProps[]
}


export interface InitialStateType {
    profile: User | null
    loading: boolean;
    error: string | null
}