import fs from 'fs';
import { StoredUserType } from '../../types/user';

const userDataPath = `${process.cwd()}/data/users.json`;

const getList = async () => {
  try {
    const users = await new Promise<StoredUserType[]>((resolve, reject) => {
      fs.readFile(userDataPath, (err, data) => {
        if(err) {
          return reject(err.message);
        }
        const usersString = data.toString();
        if(usersString === '') {
          return resolve([]);
        }
        const storedUsers: StoredUserType[] = JSON.parse(data.toString());
        return resolve(storedUsers);
      });
    });
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//* 유저 검색하기
const find = async ({ id, email }: { id?: number; email?: string }) => {
  try {
    const users = await getList();
    const user = users.find((user) => user.id === id || user.email === email);
    return user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}


//* 유저가 있는지 확인하기
const exist = async ({ id, email }: { id?: number; email?: string }) => {
  try {
    const users = await getList();
    const userExist = users.some((user) => user.id === id || user.email === email);
    return userExist;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//* 유저 저장하기
const write = async (users: StoredUserType[]) => {
  fs.writeFile(userDataPath, JSON.stringify(users), (err) => {
    if(err) {
      console.log(err.message);
      throw Error('데이터 저장 에러');
    }
  });
};

export default { getList, find, exist, write };
