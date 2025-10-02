import { createFileRoute } from '@tanstack/react-router'
import CountPage from '~/components/pages/Count'
import { getCount } from '~/server/actions/count'
import { delay } from '~/shared/utils'

export const Route = createFileRoute('/count')({
    component: CountPage,
    loader: async () => ({
        count: await getCount(),
        slowCount: delay(1000).then(() => getCount()),
    }),
})
