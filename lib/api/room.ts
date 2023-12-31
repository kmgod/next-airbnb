import axios from '.';
import { RegisterRoomState } from '../../types/reduxState';
import { RoomType } from '../../types/room';
import { makeQueryString } from '../utils';

export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) =>
  axios.post('api/rooms', body);

//* 속소 리스트 불러오기 query
type GetRoomListAPIQueries = {
  location?: string | string[];
  checkInDate: string | string[];
  checkOutDate: string | string[];
  adultCount?: string | string[];
  childrenCount: string | string[];
  infantsCount?: string | string[];
  latitude: string | string[];
  longitude: string | string[];
  limis: string | string[];
  page: string | string[];
};

//* 숙소 리스트 불러오기
export const getRoomListAPI = (queries: GetRoomListAPIQueries) => {
  return axios.get<RoomType[]>(makeQueryString('/api/rooms', queries));
};

//* 숙소 한개 불러오기
export const getRoomAPI = (roomId: number) =>
  axios.get<RoomType>((`/api/rooms${roomId}`));