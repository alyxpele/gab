import fs from 'node:fs/promises'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { MaterialSymbol } from '@/components/utils/MaterialSymbols'

const filePath = new URL('../data/count.txt', import.meta.url)

async function readCount() {
    return parseInt(await fs.readFile(filePath, 'utf-8').catch(() => '0'))
}

const getCount = createServerFn({
    method: 'GET',
}).handler(() => {
    return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
    .validator((d: number) => d)
    .handler(async ({ data }) => {
        const count = await readCount()
        await fs.writeFile(filePath, (count + data).toString())
    })

export const Route = createFileRoute('/')({
    component: Home,
    loader: async () => await getCount(),
})

function Home() {
    const state = Route.useLoaderData()
    const router = useRouter()

    const classes = {
        container: 'p-4',
        button: 'flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none group',
        icon: 'me-2 group-hover:icon-filled transition-all duration-100',
    }

    const handleClick = () => {
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
                {`ADD 1 TO ${state.toString()}?`}
            </button>
        </div>
    )
}
