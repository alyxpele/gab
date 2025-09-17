import InboxPage from '@/components/pages/Inbox'
import { getMessages } from '@/server/actions/messages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inbox')({
    component: InboxPage,
    loader: async () => ({
        messages: await getMessages(),
    }),
})
