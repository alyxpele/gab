import fs from 'node:fs/promises'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

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

    const handleClick = () => {
        void updateCount({ data: 1 }).then(() => {
            void router.invalidate()
        })
    }

    return (
        <button
            type="button"
            onClick={handleClick}
        >
            {`ADD 1 TO ${state.toString()}?`}
        </button>
    )
}
