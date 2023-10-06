import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/user";
import { UserState } from "../types/reduxState";

//* 초기상태
const initialState: UserState = {
  id: 0,
  email: '',
  lastname: '',
  firstname: '',
  birthday: '',
  isLogged: false,
  profileImage: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //* 사용자 상태 변경하기
    setUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true};
      return state;
    },
    //* 사용자 초기화 하기
    initUser(state) {
      state = initialState;
      return state;
    }
  },
});

export const userActions = { ...user.actions };
export default user;