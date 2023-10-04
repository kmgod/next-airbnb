import { UserType } from "./user";

//* User redux state
export type UserState = UserType & {
  isLogged: boolean;
};