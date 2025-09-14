import { createFileRoute } from '@tanstack/react-router'
import { getCount } from '@/server/actions/count'
import Home from '@/components/pages/Home'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const Route = createFileRoute('/')({
    component: Home,
    loader: async () => ({
        count: await getCount(),
        slowCount: delay(1000).then(() => getCount()),
    }),
})
