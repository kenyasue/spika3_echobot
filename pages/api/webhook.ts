// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {

  if(req.method  !== "POST"){
    res.status(405).send("Method not allowed")
  }

  res.status(200).send("OK")
}
