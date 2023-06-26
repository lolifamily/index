import {NextRequest, NextResponse} from "next/server";

export const config = {
    matcher: '/((?!api/css|api/status$).*)'
};

const allowList = ["lolifamily.js.org", "lolifamily.vercel.app", "lolifamilies.vercel.app",
    "lolistation.vercel.app", "lolistations.vercel.app"];

export default function middleware(req: NextRequest) {
    if (allowList.indexOf(req.nextUrl.host) === -1) {
        return NextResponse.redirect("https://lolifamily.js.org");
    }
    return NextResponse.next();
}