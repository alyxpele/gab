import React from 'react'
import type { MaterialSymbolName } from '@/assets/icons/materialSymbols'
import { MaterialSymbol } from '../MaterialSymbols'
import { cx, rcx } from '@/components/utils/cva.config'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: MaterialSymbolName,
    size?: 'sm' | 'md',
    classes?: Partial<Record<'container' | 'icon', string>>,
}

export const IconButton = (props: IconButtonProps) => {
    const { icon, size = 'md', classes: classesOverrides, ...rest } = props
    const classes = rcx({
        container: 'rounded-full cursor-pointer hover:bg-black/10 active:bg-black/15 transition-all duration-200 ease-in-out',
        icon: cx('text-center content-center text-black/50', size === 'md' ? 'size-12' : 'size-10'),
    }, classesOverrides)

    return (
        <button className={classes.container} {...rest}>
            <MaterialSymbol className={classes.icon} icon={icon} />
        </button>
    )
}
