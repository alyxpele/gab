/*
 * Add symbols you want to use here for them to be fetched and declared to TS
 *  -> https://fonts.google.com/icons?icon.set=Material+Symbols
 */
export const availableSymbols = [
    'star',
    'more_time',
] as const

export type MaterialSymbolName = typeof availableSymbols[number]
