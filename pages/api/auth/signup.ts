import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //* 계정 생성하기
  if (req.method === 'POST') {
    //* 값을 받았는지 확인

    return res.end();
  }
  const userExit = Data.user.exist({ email });
  if (userExit) {
    res.statusCode = 409;
    res.send("이미 가입된 이메일입니다.")
  }

  res.statusCode = 405;

  return res.end();
};
