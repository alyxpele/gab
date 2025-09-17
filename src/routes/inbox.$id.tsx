import { createFileRoute, getRouteApi, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/inbox/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    const routeApi = getRouteApi('/inbox/$id')
    const { id } = routeApi.useParams()

    return (
        <div className="flex flex-col my-4 p-4 border border-pink-500">
            <Link to="/inbox" className="hover:bg-neutral-100 border border-pink-500">
                Back
            </Link>
            <div className="grow flex flex-col flex-nowrap">
                <span className="text-wrap break-all">
                    Hello /inbox/{id}!
                </span>
            </div>
        </div>
    )
}
