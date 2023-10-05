import axios from "axios";
import { LoginAPIBody, SignUpAPIBody,  } from "../../types/api/auth";
import { UserType } from "../../types/user";

//* 회원 가입 API
export const signupAPI = (body: SignUpAPIBody) =>
axios.post<UserType>('api/auth/signup', body);

//* 로그인 API
export const loginAPI = (body: LoginAPIBody) =>
axios.post<UserType>('api/auth/login', body);

//* 로그아웃 API
export const logoutAPI = () => axios.delete('api/auth/logout');