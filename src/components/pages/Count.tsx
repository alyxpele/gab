import { Suspense, use } from 'react'
import { getRouteApi, useRouter } from '@tanstack/react-router'
import { updateCount } from '@/server/actions/count'
import { MaterialSymbol } from '@/components/ui/MaterialSymbols'

const ButtonText = (props: { promise: Promise<number> }) => {
    const count = use(props.promise)

    console.log('[client]: render - count:', count)
    return <span>{`ADD 1 TO ${count.toString()}?`}</span>
}

export default function Count() {
    const router = useRouter()
    const routeApi = getRouteApi('/count')
    const state = routeApi.useLoaderData()

    const classes = {
        container: 'p-4 flex flex-col gap-2 items-start',
        button: 'flex items-center rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none group font-bold',
        icon: 'me-2 group-hover:icon-dark transition-all duration-100',
    }

    const handleClick = () => {
        console.log('[client]: add 1 to', state.count)

        void updateCount({ data: 1 }).then(() => {
            void router.invalidate()
        })
    }

    return (
        <div className={classes.container}>
            <button
                type="button"
                className={classes.button}
                onClick={handleClick}
            >
                <MaterialSymbol icon="star" variant="rounded" className={classes.icon} />
                {`ADD 1 TO ${state.count.toString()}?`}
            </button>
            <button
                type="button"
                className={classes.button}
                onClick={handleClick}
            >
                <MaterialSymbol icon="more_time" variant="sharp" className={classes.icon} />
                <Suspense fallback="LOADING...">
                    <ButtonText promise={state.slowCount} />
                </Suspense>
            </button>
        </div>
    )
}
