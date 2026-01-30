import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";

import Negotiator from "negotiator";

let locales = ['en', 'bn']
let defaultLocale = 'en'

function getLocale(request) {
    const acceptedLanguage = request.headers.get('accept-language') ?? undefined

    let headers = { 'accept-language': acceptedLanguage };

    let languages = new Negotiator({ headers }).languages()
    return match(languages, locales, defaultLocale)
}


export function middleware(request) {
    const pathName = request.nextUrl.pathname;

    const pathnameIsMissingLocale = locales.every((locale) => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`)

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        return NextResponse.redirect(new URL(`/${locale}/${pathName}`, request.url))
    }
}

export const config = {
    matcher: [
        '/((?!api|assets|.*\\..*|_next).*)',
    ]
