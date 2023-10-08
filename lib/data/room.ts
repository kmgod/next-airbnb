import fs from 'fs';
import { StoredRoomType } from '../../types/room';

const roomDataPath = `${process.cwd()}/data/rooms.json`;
const getList = async () => {
  try {
    const rooms = await new Promise<StoredRoomType[]>((resolve, reject) => {
      fs.readFile(roomDataPath, (err, data) => {
        if(err) {
          return reject(err.message);
        }
        const roomsString = data.toString();
        if(roomsString === '') {
          return resolve([]);
        }
        const storeRooms: StoredRoomType[] = JSON.parse(data.toString());
        return resolve(storeRooms);
      });
    });
    return rooms;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//* 숙소 저장하기
const write = async (rooms: StoredRoomType[]) => {
  fs.writeFile(roomDataPath, JSON.stringify(rooms), (err) => {
    if(err) {
      console.log(err.message);
      throw Error('데이터 저장 에러');
    }
  });
};

//* 속소 검색하기
const find = async (roomId: number) => {
  try {
    const rooms = await getList();
    const user = rooms.find((room) => room.id === roomId);
    return user;
  } catch (error) {
    console.log(error)
    return undefined;
  }
}

export default { getList, write, find };