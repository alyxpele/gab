import { createFileRoute, getRouteApi, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/inbox/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    const routeApi = getRouteApi('/inbox/$id')
    const { id } = routeApi.useParams()

    return (
        <div className="my-4 pl-4 border border-pink-500">
            <Link to="/inbox" className="hover:bg-neutral-100 border border-pink-500">
                Back
            </Link>
            <div>Hello /inbox/{id}!</div>
        </div>
    )
}
