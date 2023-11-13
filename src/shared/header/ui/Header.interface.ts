import { User } from "firebase/auth";

export interface Item {
  text: string;
  rating: number;
}

export interface SearchProps {
  items: Item[],
}

export interface HeaderProps {
  items?: Item[],
  handleSingOut: () => void,
  user: User | null
}
export interface ProfilePageProps {
  user: User | null
}