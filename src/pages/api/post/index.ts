import type { NextApiRequest, NextApiResponse } from 'next'
import model from '../../../lib/models'
import { getSession } from 'next-auth/react'



// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, price, city } = req.body;

  const session = await getSession({ req });
  if (session) {
    const result = await model.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email } },
        price: price,
        city: city,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
