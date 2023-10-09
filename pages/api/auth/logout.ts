import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if(req.method === 'DELETE') {
      res.setHeader(
        'Set-Cookie :',
        `access_token=;path=/;expires=${new Date(
          Date.now() + 60 * 60 * 24 * 1000 * 3
        )};httponly`
      );
      res.statusCode = 204;
      return res.end();
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
  res.statusCode = 405
  return res.end();
}