import { Separator } from '@base-ui-components/react'
import { Link } from '@tanstack/react-router'
import { cva, rcx } from '~/components/utils/cva.config'
import { statuses, type Message } from '~/shared/messages'

export const MessageListItem = ({ message }: { message: WithId<Message> }) => {
    const classes = rcx({
        messageItem: 'hover:bg-black/10 active:bg-black/15 border-l-3 rounded-r-md text-black/90',
        container: 'p-4 pl-6 flex flex-col',
        senderName: 'text-lg font-bold overflow-hidden whitespace-nowrap text-ellipsis',
        company: 'text-lg overflow-hidden whitespace-nowrap text-ellipsis',
        time: 'ml-auto text-sm text-black/60',
        subject: 'overflow-hidden whitespace-nowrap text-ellipsis',
        preview: 'mt-1.5 text-sm/4.5 text-black/60 text-ellipsis line-clamp-2',
    }, {
        messageItem: cva({
            variants: {
                color: {
                    orange: 'border-orange-500/60',
                    sky: 'border-sky-500/60',
                    green: 'border-green-500/60',
                    purple: 'border-purple-500/60',
                },
            },
        })({ color: statuses.find((s) => s.value === message.status)?.color }),
    })
    const name = message.sender.name.split(' ')
    const shortname = name.length > 1 ? `${name[0]} ${name[1].charAt(0)}.` : name[0]
    const time = new Date(message.date).toLocaleTimeString(undefined, {
        hour: '2-digit', minute: '2-digit', hour12: false,
    })

    return (
        <li className={classes.messageItem}>
            <Link to="/inbox/$id" params={{ id: message.id }}>
                <div className={classes.container}>
                    <div className="flex gap-2 items-center">
                        <span className={classes.senderName}>{shortname}</span>
                        <Separator orientation="vertical" className="h-5 w-px bg-black/25" />
                        <span className={classes.company}>{message.company}</span>
                        <span className={classes.time}>{time}</span>
                    </div>
                    <span className={classes.subject}>{message.subject}</span>
                    <span className={classes.preview}>{message.content}</span>
                </div>
            </Link>
        </li>
    )
}
