import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let env = process.env.NEXT_PUBLIC_VERCEL_ENV || "unknown";
    let sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "unknown";
    res.status(200).end(env + ':' + sha.substring(0, 6));
}
