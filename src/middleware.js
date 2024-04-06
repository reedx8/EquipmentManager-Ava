import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Middlware is automatically invoked by Next.js. Must be named `middleware`, must export, and file must be in the `src` directory.
export async function middleware(req) {
    // console.log('middleware is being called: ', req.nextUrl.pathname);

    if (req.nextUrl.pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    const res = NextResponse.next();
    // const supabase = createMiddlewareClient({ req, res });
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return req.cookies.get(name)?.value;
                },
                set(name, value, options) {
                    req.cookies.set({
                        na,
                        e,
                        value,
                        ...options,
                    });
                    const response = NextResponse.next({
                        request: {
                            headers: req.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name, options) {
                    req.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                    const response = NextResponse.next({
                        request: {
                            headers: req.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // console.log('user: ', user);

    // redirect to /login page if the user is not signed in
    const publicPaths = ['/login'];
    if (!user && !publicPaths.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // redirect to home page is user is already signed in:
    if (user && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    /*
  // if user is signed in and the current path is / redirect the user to /account
  if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/account', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }
  */

    return res;
}

/*
export const config = {
  matcher: ['/', '/account'],
}
*/
