import fs from 'node:fs/promises'
import { createServerFn } from '@tanstack/react-start'

const filePath = process.env.COUNT_PATH ?? '/tmp/count.txt'

async function readCount() {
    const count = await fs.readFile(filePath, 'utf-8')
        .catch(() => '0')

    console.log('[server] Read count', count)
    return Number(count)
}

async function writeCount(count: number) {
    await fs.writeFile(filePath, count.toString())

    console.log('[server] updateCount:', count)
}

const getCount = createServerFn({
    method: 'GET',
}).handler(async () => {
    return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
    .validator((d: number) => d)
    .handler(async ({ data }) => {
        const count = await readCount()
        await writeCount(count + data)
    })

export {
    getCount,
    updateCount,
}
