import axios from "axios";
import { UserType } from "../../types/user";

//* 사용자 정보 가져오기
export const getUser = () => axios.get<UserType>('/api/users/me');