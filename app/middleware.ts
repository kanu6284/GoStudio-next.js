import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { Database } from './types/supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data:{
        session
    }
  } = await supabase.auth.getSession();

  console.log(session);
  console.log(req.url);
    

  if(!session){
    return NextResponse.rewrite(new URL('/dashboard', req.url))
  }

  

  return res
  const config = {
    matcher: [
   
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
  }
};
  
