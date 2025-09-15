import { createFileRoute, Link, Outlet, useParams } from '@tanstack/react-router'
import { cx } from '@/components/utils/cva.config'

export const Route = createFileRoute('/inbox')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = useParams({ strict: false })
    const selected = id !== undefined

    const classes = {
        container: 'flex gap-2 bg-neutral-800 p-2 w-full h-dvh',
        leftPane: cx(
            'flex flex-col bg-neutral-200 border border-white rounded-lg w-full sm:max-w-[calc(calc(1/3*100%)-(--spacing(1)))] sm:min-w-72 sm:w-112 h-full',
            selected && 'max-sm:hidden',
        ),
        rightPane: cx(
            'flex-auto bg-white border border-white rounded-lg',
            !selected && 'max-sm:hidden',
        ),
    }

    return (
        <div className={classes.container}>
            <div className={classes.leftPane}>
                <span className="my-4 pl-4 border border-pink-500 text-2xl">Inbox</span>
                <Link to="/inbox/$id" params={{ id: '1' }} className="hover:bg-neutral-50 border border-pink-500">
                    Open 1
                </Link>
                <Link to="/inbox/$id" params={{ id: '2' }} className="hover:bg-neutral-50 border border-pink-500">
                    Open 2
                </Link>
            </div>
            <div className={classes.rightPane}>
                <Outlet />
            </div>
        </div>
    )
}
