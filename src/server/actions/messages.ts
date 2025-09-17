import crypto from 'crypto'
import { createServerFn } from '@tanstack/react-start'
import mails from '@/server/data/emails.json'
import { delay } from '@/shared/utils'
import type { Message } from '@/shared/messages'

function hash(data: object) {
    const hash = crypto.createHash('sha-1')
    hash.update(JSON.stringify(data))
    return hash.digest('hex')
}

const getMessages = createServerFn({
    method: 'GET',
}).handler(async () => {
    const messages = mails satisfies Array<Message>
    await delay(100)
    return messages.map((message) => ({ ...message, id: hash(message) }))
})

const getMessage = createServerFn({
    method: 'GET',
})
    .validator((data: string) => data)
    .handler(async (ctx) => {
        return (await getMessages()).find((m) => m.id === ctx.data)
    })

export {
    getMessages,
    getMessage,
}
