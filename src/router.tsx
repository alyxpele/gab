import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { NotFound } from '~/components/utils/NotFound'
import { routeTree } from './routeTree.gen'

export function getRouter() {
    const router = createTanStackRouter({
        routeTree,
        scrollRestoration: true,
        defaultNotFoundComponent: () => <NotFound />,
    })

    return router
}
