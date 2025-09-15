import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inbox/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="max-sm:hidden h-full flex items-center justify-center text-black/20">
            Nothing selected
        </div>
    )
}
