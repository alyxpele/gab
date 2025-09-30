import type { ReactNode } from 'react'
import {
    Outlet,
    HeadContent,
    Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body suppressHydrationWarning className="min-h-dvh overflow-hidden">
                {children}
                <Scripts />
            </body>
        </html>
    )
}

export function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" />
        </RootDocument>
    )
}
