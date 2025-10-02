import { ScrollArea, Separator } from '@base-ui-components/react'
import { Tabs } from '@base-ui-components/react/tabs'
import { getRouteApi, Outlet, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { Badge } from '~/components/ui/Badge'
import { IconButton } from '~/components/ui/IconButton'
import { MaterialSymbol } from '~/components/ui/MaterialSymbols'
import { Select } from '~/components/ui/Select'
import { cx, rcx } from '~/components/utils/cva.config'
import { statuses } from '~/shared/messages'
import { MessageListItem } from './MessageListItem'

const tabs = {
    conversations: { label: 'Conversations', icon: 'chat_bubble' },
    contacts: { label: 'Contacts', icon: 'person' },
} as const

export default function Inbox() {
    const { id } = useParams({ strict: false })
    const routeApi = getRouteApi('/inbox')
    const state = routeApi.useLoaderData()
    const [selectedTab, setSelectedTab] = useState<keyof typeof tabs>('conversations')
    const [filters, setFilters] = useState<Array<string>>([])
    const selected = id !== undefined

    const classes = rcx({
        rootContainer: 'flex gap-2 bg-neutral-800 p-2 w-full h-screen',
        leftPane: '@container bg-gray-200 border border-white rounded-lg w-full md:w-96 md:min-w-96 h-full p-8',
        rightPane: 'grow bg-white border border-white rounded-lg',

        titleRoot: 'flex mb-4',
        titleContainer: 'flex flex-col grow',
        actionsContainer: 'flex items-center gap-2 h-fit self-center',
        title: 'text-3xl font-semibold',
        subtitle: 'text-sm text-black/50',

        tabsRoot: '',
        tabList: 'mb-2 relative z-0 flex gap-2 @sm:justify-start justify-between rounded-full border border-white bg-black/5',
        tabItem: 'px-6 flex h-12 items-center justify-center text-sm font-medium break-keep whitespace-nowrap rounded-full text-black/60 hover:text-black/80 hover:bg-black/10 active:bg-black/15 transition-all duration-200 ease-in-out data-[selected]:text-white',
        selectedTabIndicator: 'absolute top-1/2 left-0 z-[-1] h-full w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-1/2 rounded-full bg-black transition-all duration-200 ease-in-out',
        panel: '',

        scrollRoot: 'mr-[calc(var(--spacing)*-2)] h-[calc(100vh-calc(var(--spacing)*60))] mask-b-from-90%',
        scrollViewport: 'h-full overscroll-contain',
        messageList: 'mr-2 pb-8 [&>li]:not-last:mb-4',
        scrollbar: 'flex w-1 justify-center rounded bg-white/70 opacity-0 transition-opacity delay-300 data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75 mb-8',
        scrollThumb: 'w-full rounded bg-black/40',
    })

    const tabChangeHandler = (tab: keyof typeof tabs) => {
        setSelectedTab(tab)
    }

    const filteredMessages = state.messages.filter(
        (message) => filters.length === 0 || filters.includes(message.status))

    return (
        <div className={classes.rootContainer}>
            <div className={cx(classes.leftPane, selected && 'max-md:hidden')}>
                <div className={classes.titleRoot}>
                    <div className={classes.titleContainer}>
                        <span className={classes.title}>Inbox</span>
                        <span className={classes.subtitle}>
                            {state.messages.filter((m) => m.status === 'to_validate').length}&nbsp;actions, {state.messages.length}&nbsp;messages
                        </span>
                    </div>
                    <div className={classes.actionsContainer}>
                        <IconButton icon="search" />
                        <Separator orientation="vertical" className="h-5 w-px bg-black/15" />
                        <IconButton icon="edit_square" />
                    </div>
                </div>
                <Tabs.Root className={classes.tabsRoot} value={selectedTab} onValueChange={tabChangeHandler}>
                    <Tabs.List className={classes.tabList}>
                        {Object.entries(tabs).map(([tabId, tab]) => (
                            <Tabs.Tab key={tabId} className={classes.tabItem} value={tabId}>
                                <MaterialSymbol className="mr-2" icon={tab.icon} opticalSize={20} />
                                <span>{tab.label}</span>
                            </Tabs.Tab>
                        ))}
                        <Tabs.Indicator className={classes.selectedTabIndicator} />
                    </Tabs.List>
                    <Tabs.Panel className={classes.panel} value="conversations">
                        <Select
                            multiple
                            icon="filter_list"
                            items={statuses}
                            value={filters}
                            onValueChange={setFilters}
                            renderValue={(filters) => (
                                filters.length === 0 ? (
                                    <span className="text-black/50">Filters</span>
                                ) : statuses.filter((status) => filters.includes(status.value))
                                    .map(({ value, ...rest }) => (<Badge key={value} capsule {...rest} />))
                            )}
                            useRenderValueInPopup
                            classes={{ item: 'py-1' }}
                        />
                        <Separator orientation="horizontal" className="h-px w-full mt-1 mb-4 bg-black/15" />
                        <ScrollArea.Root className={classes.scrollRoot}>
                            <ScrollArea.Viewport className={classes.scrollViewport}>
                                <ul className={classes.messageList}>
                                    {filteredMessages.map((message) => (
                                        <MessageListItem key={message.id} message={message} />
                                    ))}
                                </ul>
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar className={classes.scrollbar}>
                                <ScrollArea.Thumb className={classes.scrollThumb} />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </Tabs.Panel>
                    <Tabs.Panel className={classes.panel} value="contacts">
                        <span className="mt-2 text-xl">No contacts</span>
                    </Tabs.Panel>
                </Tabs.Root>
            </div>
            <div className={cx(classes.rightPane, !selected && 'max-md:hidden')}>
                <Outlet />
            </div>
        </div>
    )
}
