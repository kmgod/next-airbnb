import axios from "axios";
import { SignUpAPIBody } from "../../types/api/auth";
import { UserType } from "../../types/user";

export const signupAPI = (body: SignUpAPIBody) =>
axios.post<UserType>('api/auth/signup', body);