import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if(req.method === 'DELETE') {
      res.setHeader(
        'Set-Cookie',
        `access_token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;httponly`
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