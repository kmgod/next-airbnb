import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterRoomState } from '../types/reduxState';
import { BedType } from '../types/room';

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null, 
  maximumGuestCount: 1,
  bedroomCount: 0,
  bedCount: 1,
  bedList: [],
  publicBedList: [],
  bathroomCount: 1,
  bathroomType: null,
  latitude: 0,
  longitude: 0,
  country: '',
  city: '',
  district: '',
  streetAddress: '',
  detailAddress: '',
  postcode: '',
  amentities: [],
  conveniences: [],
  photos: [],
  description: '',
  title: '',
  price: 0,
  startDate: null,
  endDate: null,
};

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if(action.payload === '') {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    setBuildingType(state, action: PayloadAction<string>) {
      if(action.payload === '') {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },

    setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
      state.roomType = action.payload;
      return state;
    },

    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },

    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },  

    setBedroomCount(state, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
      let { bedList } = state;
      state.bedroomCount = bedroomCount;
      if(bedroomCount < bedList.length) {
        bedList = state.bedList.slice(0, bedroomCount);
      } else {
        for(let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
          bedList.push({ id: i, beds: [] });
        }
      }
      state.bedList = bedList;
      return state;
    },  
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },    
    
    setBedTypeCount(state, action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed) => bed.type === type);
      if (index === -1) {
        //* 타입이 없다면
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }
      //* 타입이 존재한다면    
      state.bedList[bedroomId -1].beds[index].count = count;
      return state;
    },    
    //* 공용 공간 침대 유형 갯수 변경하기
    setPublicBedTypeCount(state, action: PayloadAction<{ type: BedType; count: number }>) {
      const { type, count } = action.payload;
      const index = state.publicBedList.findIndex((bed) => bed.type === type);
      if(index === -1) {
        //* 타입이 없다면
        state.publicBedList = [...state.publicBedList, { type, count }];
        return state;
      }
      //* 타입이 존재한다면
      state.publicBedList[index].count = count;
      return state;
    },
    //* 공용 공간 침대 갯수 변경하기
    setBathroomCount(state, action: PayloadAction<number>) {
      state.bathroomCount = action.payload;
      return state;
    },      

    //* 공용 공간 침대 유형 변경하기
    setBathroomType(state, action: PayloadAction<'private' | 'public'>) {
      state.bathroomType = action.payload;
      return state;
    },      

    //* 국가 변경하기
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
      return state;
    },   
    
    //* 시도 변경하기
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
      return state;
    },   

    //* 시군구 변경하기
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
      return state;
    },  
    
    //* 주소 변경하기
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
      return state;
    },   

    //* 주소 상세 변경하기
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
      return state;
    },   

    //* 우편번호 변경하기
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
      return state;
    },   
    
    //* 위도 변경하기
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
      return state;
    },   
    //* 경도 변경하기
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
      return state;
    },   

    //* 편의시설 변경하기
    setAmetities(state, action: PayloadAction<string[]>) {
      state.amentities = action.payload;
      return state;
    },   

    //* 편의공간 변경하기
    setConveniences(state, action: PayloadAction<string[]>) {
      state.conveniences = action.payload;
      return state;
    },

    //* 숙소 사진 변경하기
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
      return state;
    },

    //* 숙소 설명 변경하기
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
      return state;
    },

    //* 숙소 제목 변경하기
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
      return state;
    },

    //* 숙소 요금 변경하기
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
      return state;
    },

    //* 예약 가능 시작 날짜 변경하기
    setStartDate(state, action: PayloadAction<string | null>) {
      state.startDate = action.payload;
      return state;
    },

    //* 예약 가능 마감 날짜 변경하기
    setEndDate(state, action: PayloadAction<string | null>) {
      state.endDate = action.payload;
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };
export default registerRoom;