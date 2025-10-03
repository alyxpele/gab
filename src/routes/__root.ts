/// <reference types="vite/client" />
import { createRootRoute } from '@tanstack/react-router'
import { RootComponent } from '~/components/pages/Root'
import { materialSymbolsUrl } from '~/server/constants'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'gab',
            },
        ],
        links: [
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300..700&display=swap' },
            { rel: 'stylesheet', href: materialSymbolsUrl },
            { rel: 'stylesheet', href: appCss },
        ],
    }),
    component: RootComponent,
})
