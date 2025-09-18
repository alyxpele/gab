import { createFileRoute } from '@tanstack/react-router'
import { getMessage } from '@/server/actions/messages'
import MessageViewPage from '@/components/pages/Inbox/MessageView'

export const Route = createFileRoute('/inbox/$id')({
    component: MessageViewPage,
    loader: async (route) => ({
        message: await getMessage({ data: route.params.id }),
    }),
})
