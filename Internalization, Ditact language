import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import React from 'react'


let defaultLocale = 'en';
let locales = ['en', 'bn']

function getLocale(request) {
    const acceptedLanguage = request.headers.get("accept-language") ?? undefined;

    const headers = { 'accept-language': acceptedLanguage };

    const languages = new Negotiator({ headers }).languages();

    return match(languages, locales, defaultLocale)
}

export default function middleware(request) {
    // Get the pathname from request url

    const pathName = request.nextUrl.pathname;

    // Direct path 
    const pathNameIsMissingLocal = locales.every(locale => !pathName.startsWith(`/${locale}`) && !pathName.startsWith(`/${locale}/`))



    if (pathNameIsMissingLocal) {
        // detect user's preference & redirect with a locale with a path eg: /en/about

        const locale = getLocale(request)

        return NextResponse.redirect(new URL(`/${locale}${pathName}`, request.url))
    }


    return NextResponse.next()

}


export const config = {
    matcher: ["/((?!_next).*)"],
};
