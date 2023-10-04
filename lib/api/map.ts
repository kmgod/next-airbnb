import axios from "axios";

//* 구글 장소 검색 API
export const searchPlaceAPI = (keyword: string) =>
  axios.get<{ description: string; placeId: string }[]>(
    `/api/maps/places?keyword=${keyword}`
  );

//* placeId로 장소 정보 가져오기
export const getPlaceAPI = (placeId: string) =>
  axios.get<{ location: string; latitude: Number; longitude: number }>(
    `/api/maps/places/${placeId}`
  );

type GetLocationInfoAPIResponse = {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
};

//* 현재 위치 정보 가져오기 API
export const getLocationInfoAPI = async ({
  latitude,
  longitude,
}: { 
  latitude: number,
  longitude: number;
}) => axios.get<GetLocationInfoAPIResponse>(
        `/api/maps/locations?latitude=${latitude}&longitude=${longitude}`
      );
