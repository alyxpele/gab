import { createFileRoute } from '@tanstack/react-router'
import MessageViewPage from '~/components/pages/Inbox/MessageView'
import { getMessage } from '~/server/actions/messages'

export const Route = createFileRoute('/inbox/$id')({
    component: MessageViewPage,
    loader: async (route) => ({
        message: await getMessage({ data: route.params.id }),
    }),
})
