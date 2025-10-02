import { createServerFn } from '@tanstack/react-start'
import crypto from 'crypto'
import mails from '~/server/data/emails.json'
import type { Message } from '~/shared/messages'
import { delay } from '~/shared/utils'

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
    .inputValidator((data: string) => data)
    .handler(async (ctx) => {
        return (await getMessages()).find((m) => m.id === ctx.data)
    })

export {
    getMessage, getMessages
}

