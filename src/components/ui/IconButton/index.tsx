import React from 'react'
import type { MaterialSymbolName } from '~/assets/icons/materialSymbols'
import { cx, rcx } from '~/components/utils/cva.config'
import { MaterialSymbol } from '../MaterialSymbols'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: MaterialSymbolName,
    size?: 'sm' | 'md',
    classes?: Partial<Record<'container' | 'icon', string>>,
}

export const IconButton = (props: IconButtonProps) => {
    const { icon, size = 'md', classes: classesOverrides, ...rest } = props
    const classes = rcx({
        container: cx('rounded-full flex items-center justify-center cursor-pointer hover:bg-black/10 active:bg-black/15 transition-all duration-200 ease-in-out', size === 'md' ? 'size-12' : 'size-10'),
        icon: 'text-center content-center text-black/50',
    }, classesOverrides)

    return (
        <button className={classes.container} {...rest}>
            <MaterialSymbol className={classes.icon} icon={icon} />
        </button>
    )
}
