import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET') {
    try {
      const accessToken = req.headers.cookie;
      if(accessToken) {
        const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);
        const user = await Data.user.find({ id: Number(userId) });
        if(user) {
          delete user.password;
          res.statusCode = 200;
          return res.send(user);
        }
        res.statusCode = 404;
        return res.send('the user is not there');
      }
      res.statusCode = 400;
      return res.end();
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
  }
  res.statusCode = 405;
  return res.end();
}