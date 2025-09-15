import { availableSymbols } from '@/assets/icons/materialSymbols'

const icon_names = availableSymbols.concat()
    .sort((a, b) => a.localeCompare(b))
    .join()

export const materialSymbolsUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=${icon_names}&display=block`
