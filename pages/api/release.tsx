import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let env = process.env.VERCEL_ENV || "unknown";
    let sha = process.env.VERCEL_GIT_COMMIT_SHA || "000000";
    res.status(200).end(env + ':' + sha.substring(0, 6));
}
