import {NextRequest, NextResponse} from "next/server";

export const config = {
    runtime: 'edge'
};
export default async function handler(req: NextRequest) {
    let header = new Headers();
    header.set('Cache-Control', 's-maxage=63072000');
    return new NextResponse("OK", {
        "headers": header
    });
}
