// On-Demand Revalidation: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  status: boolean,
  msg?: string
}
//* This endpoint will trigger a rebuild to a specific static page.

// ideally this route should be protected with some sort of auth
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { id } = req.query;
    if (!id) throw "Please provide an id."
    if (isNaN(Number(id))) throw "Please provide a valid number for the id."
    res.revalidate('/users/' + id)
    res.status(200).json({ status: true, msg: `User ${id}'s page has been rebuilt.` })
  } catch (err) {
    res.status(400).json({ status: false, msg: err?.toString() })
  }
}

