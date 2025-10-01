import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { Avatar, Separator, Toolbar } from '@base-ui-components/react'
import { rcx } from '@/components/utils/cva.config'
import { Badge } from '@/components/ui/Badge'
import { statuses } from '@/shared/messages'
import { MaterialSymbol } from '@/components/ui/MaterialSymbols'
import { IconButton } from '@/components/ui/IconButton'

export default function MessageView() {
    const routeApi = getRouteApi('/inbox/$id')
    const { message } = routeApi.useLoaderData()
    const navigate = useNavigate({ from: '/inbox/$id' })

    const classes = rcx({
        rootContainer: 'h-full flex flex-col p-6 pt-8',
        headerContainer: 'flex max-sm:flex-col min-md:max-lg:flex-col gap-4 items-baseline [&>div]:first:min-w-24 [&>div]:first:flex',
        titleContainer: 'flex flex-col items-start',
        title: 'text-xl font-semibold',
        folder: 'mt-0.5 px-2 py-0.5 rounded-md flex items-center gap-1 bg-black/8 text-black/50 text-xs',
        actions: 'ml-auto flex gap-0.5',

        contentContainer: 'grow',
        messageContainer: 'flex items-baseline-last gap-3',
        messageCard: 'bg-gray-100 rounded-lg p-4 mb-2',
        addressContainer: 'flex items-baseline gap-4 text-black/50 text-xs',
        address: 'mt-0.5 px-2 py-0.5 rounded-md flex items-center gap-1 bg-black/8 text-black/50 font-medium text-xs',
        messageContent: 'mb-2 mt-3',
        textlink: 'text-black/40 decoration-black/40 underline cursor-pointer hover:text-black/60 hover:decoration-black/60',
        avatar: 'inline-flex size-10 min-w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 align-middle text-base font-medium text-black select-none',
        senderName: 'text-sm text-black/80 font-bold',
        date: 'text-sm text-black/50',

        toolbar: 'mt-6 p-0.5 w-full flex items-center gap-px rounded-full border border-gray-200 bg-gray-50',
        toolbarSeparator: 'm-1 h-4 w-px bg-black/15',
        toolbarButton: 'flex h-10 px-3 items-center justify-center rounded-sm first:rounded-l-[calc(var(--spacing)*5)] font-[inherit] text-sm font-medium text-black/70 select-none cursor-pointer hover:bg-black/10 active:bg-black/15 transition-all duration-200 ease-in-out whitespace-nowrap min-[1130px]:[&>span]:mr-2 max-[1130px]:[&>span]:last:hidden',
        aiButton: 'ml-auto h-10 rounded-full border-2 border-transparent text-sm font-medium bg-origin-border bg-linear-35 from-purple-400 to-rose-400 cursor-pointer hover:[&>span]:bg-white/70 active:[&>span]:bg-white/60',
        aiButtonContent: 'h-full px-3 flex w-full bg-white/80 rounded-full transition-all duration-200 ease-in-out',
        aiButtonText: 'flex items-center bg-linear-35 from-purple-500/80 to-rose-500/80 bg-clip-text text-transparent [&>span]:mr-2 max-[460px]:[&>span]:mr-0 min-md:max-[880px]:[&>span]:mr-0 max-[460px]:[&>span]:last:hidden min-md:max-[880px]:[&>span]:last:hidden whitespace-nowrap',
    })

    const status = (statuses.find((s) => s.value === message?.status))
    const date = new Date(message?.date ?? '')
    const name = message?.sender.name.split(' ') ?? []
    const initials = (name.length > 1 ? name[0].charAt(0) + name[1].charAt(0) : message?.sender.name.charAt(0) ?? '')
        .toUpperCase()

    return (
        <div className={classes.rootContainer}>
            <div className={classes.headerContainer}>
                <div>
                    {status !== undefined ? (
                        <Badge capsule {...status} />
                    ) : null}
                </div>
                <div className={classes.titleContainer}>
                    <span className={classes.title}>{message?.subject}</span>
                    <span className={classes.folder}>
                        <MaterialSymbol icon="folder" opticalSize={20} weight={300} />
                        Folder name
                    </span>
                </div>
                <span className={classes.actions}>
                    <IconButton size="sm" icon="search" />
                    <IconButton size="sm" icon="forward_to_inbox" />
                    <IconButton size="sm" icon="lock_open" />
                    <IconButton size="sm" icon="info" />
                    <IconButton size="sm" icon="close" onClick={() => void navigate({ to: '/inbox' })} />
                </span>
            </div>
            <Separator orientation="horizontal" className="h-px w-full mt-2 mb-4 bg-black/15" />
            <div className={classes.contentContainer}>
                <div className={classes.messageContainer}>
                    <Avatar.Root className={classes.avatar}>
                        {initials}
                    </Avatar.Root>
                    <div>
                        <div className={classes.messageCard}>
                            <div className={classes.addressContainer}>
                                To:
                                <span className={classes.address}>You</span>
                                CC:
                                <span className={classes.address}>{message?.receiver.name}</span>
                            </div>
                            <p className={classes.messageContent}>{message?.content}</p>
                            <a className={classes.textlink}>Open original message</a>
                        </div>
                        <div>
                            <span className={classes.senderName}>{message?.sender.name}</span>
                            <span className={classes.date}> • {date.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Toolbar.Root className={classes.toolbar}>
                <Toolbar.Button className={classes.toolbarButton}>
                    <MaterialSymbol icon="reply_all" />
                    <span>Reply all</span>
                </Toolbar.Button>
                <Toolbar.Separator className={classes.toolbarSeparator} />
                <Toolbar.Button className={classes.toolbarButton}>
                    <MaterialSymbol icon="reply" />
                    <span>Reply</span>
                </Toolbar.Button>
                <Toolbar.Separator className={classes.toolbarSeparator} />
                <Toolbar.Button className={classes.toolbarButton}>
                    <MaterialSymbol icon="forward" />
                    <span>Forward</span>
                </Toolbar.Button>
                <Toolbar.Separator className={classes.toolbarSeparator} />
                <Toolbar.Button className={classes.toolbarButton}>
                    <MaterialSymbol icon="call" />
                    <span>Call note</span>
                </Toolbar.Button>
                <Toolbar.Button className={classes.aiButton}>
                    <span className={classes.aiButtonContent}>
                        <span className={classes.aiButtonText}>
                            <MaterialSymbol icon="star_shine" variant="rounded" grade={-25} />
                            <span>Answer with AI</span>
                        </span>
                    </span>
                </Toolbar.Button>
            </Toolbar.Root>
        </div>
    )
}
