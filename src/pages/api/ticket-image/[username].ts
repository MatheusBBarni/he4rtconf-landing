import { NextApiRequest, NextApiResponse } from 'next'
import screenshot from 'lib/screenshot'

export default async function ticketImages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query || {}
  if (!username) return res.status(404)
  const file = await screenshot(
    `${process.env.NEXT_PUBLIC_SITE_URL}/ticket/${username}`
  )
  console.log('api print')
  res.setHeader('Content-Type', `image/png`)
  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  )
  res.statusCode = 200
  res.end(file)
}
