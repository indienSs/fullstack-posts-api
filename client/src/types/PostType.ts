import { UserType } from "./UserType";

export type PostType = {
  _id: string;
  text: string;
  creationDate: string;
  user: UserType;
  imageUrl?: string;
};
