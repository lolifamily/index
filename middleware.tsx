import {NextRequest, NextResponse} from "next/server";
import {next} from "sucrase/dist/types/parser/tokenizer";

export const config = {
    match: "^(?!\/api\/(css|status)$).*"
};

const allowList = ["lolifamily.js.org", "lolifamily.vercel.app", "lolifamilies.vercel.app",
    "lolistation.vercel.app", "lolistations.vercel.app"];

export function middleware(req: NextRequest) {
    if (allowList.indexOf(req.nextUrl.host) === -1) {
        return NextResponse.redirect("https://lolifamily.js.org");
    }
    return NextResponse.next();
}