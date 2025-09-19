'use client'

import { SignInButton, UserButton } from '@clerk/nextjs';
import { Authenticated, Unauthenticated } from 'convex/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';

const Header = () => {

    const pathname = usePathname();
    const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className="flex items-center justify-between px-4 md:px-8 h-16 border-b font-DMsemi">
        <Link href="/dashboard" className="text-2xl font-DMbold uppercase">
        Beamy 
        </Link>

        <div className='flex items-center gap-4'>
            <Authenticated>
                {!isDashboard && (
                    <Link href="/dashboard">
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                )}
                <UserButton />
            </Authenticated>

            <Unauthenticated>
                <SignInButton 
                mode="modal"
                forceRedirectUrl="/dashboard"
                signUpForceRedirectUrl="/dashboard"
                >
                    <Button variant="outline" className='cursor-pointer'>Sign In</Button>
                </SignInButton>
            </Unauthenticated>
        </div>
    </header>
  )
}

export default Header