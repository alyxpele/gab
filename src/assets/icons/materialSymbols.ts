/*
 * Add symbols you want to use here for them to be fetched and declared to TS
 *  -> https://fonts.google.com/icons?icon.set=Material+Symbols
 */
export const availableSymbols = [
    'search',
    'edit_square',
    'chat_bubble',
    'person',
    'filter_list',
    'check',
    'folder',
    'forward_to_inbox',
    'lock_open',
    'info',
    'close',
    'reply_all',
    'reply',
    'forward',
    'call',
    'star_shine',
    'star',
    'more_time',
] as const

export type MaterialSymbolName = typeof availableSymbols[number]
