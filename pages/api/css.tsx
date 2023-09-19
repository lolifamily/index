import {NextRequest, NextResponse} from "next/server";

export const config = {
    runtime: 'edge'
};

export default async function css(req: NextRequest) {
    let headers = new Headers();
    for (let item of headers.entries()) {
        if (item[0].startsWith("x-")) continue;
        headers.set(item[0], item[1].replaceAll(req.nextUrl.host, "fonts.googleapis.com"));
    }
    headers.set("accept-encoding", "gzip, deflate");

    const res = await fetch("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300", {
        "headers": headers
    });

    headers = new Headers();
    for (let item of res.headers.entries()) {
        if (item[0] === "content-encoding" || item[0] === "content-length" || item[0] === "alt-svc") continue;
        headers.set(item[0], item[1].replaceAll("fonts.googleapis.com", req.nextUrl.host));
    }

    return new NextResponse((await res.text()).replaceAll("fonts.gstatic.com", req.nextUrl.host).replaceAll("fonts.googleapis.com", req.nextUrl.host), {
        "status": res.status,
        "statusText": res.statusText,
        "headers": headers
    });
}
