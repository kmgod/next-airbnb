import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import { SignUpAPIBody } from "../../../types/api/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //* 계정 생성하기
  if (req.method === 'POST') {
    //* 값을 받았는지 확인
    const { body, }: { body: SignUpAPIBody } = req;
    const { email, firstname, lastname, password, birthday } = body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send("회원가입에 필수적인 정보가 누락되었습니다.");
    }
    const userExit = Data.user.exist({ email });
    if (userExit) {
      res.statusCode = 409;
      res.send("이미 가입된 이메일입니다.")
    }
  }
  res.statusCode = 405;
  return res.end();
};
