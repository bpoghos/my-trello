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
  setSearchVal: Function,
  handleSingOut: () => void,
  user: User | null
}
export interface ProfilePageProps {
  user: User | null
}