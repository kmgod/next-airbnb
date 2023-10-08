import fs from 'fs';
import { StoredReservation } from '../../types/reservation';

//* 저장된 숙소 예약 리스트 불러오기
const getList = async () => {
  try {
    const rooms = await new Promise<StoredReservation[]>((resolve, reject) => {
      fs.readFile('data/reservations.json', (err, data) => {
        if(err) {
          return reject(err.message);
        }
        const reservationString = data.toString();
        if(reservationString === '') {
          return resolve([]);
        }
        const reservationRooms: StoredReservation[] = JSON.parse(
          data.toString()
        );
        return resolve(reservationRooms);
      });
    });
    return rooms;
  } catch (error) {
    console.log(error);
    return []
  }
};
//* 숙소 예약 저장하기
const write = async (reservations: StoredReservation[]) => {
  fs.writeFile(
    'data/resevations.json',
    JSON.stringify(reservations),
    (err) => {
      if(err) {
        console.log(err?.message);
        throw Error('데이터 저장 에러');
      }
    }
  );
};
export default { getList, write };