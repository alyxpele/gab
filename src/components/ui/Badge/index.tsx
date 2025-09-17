import React from 'react'
import { cva, cx, type VariantProps } from '@/components/utils/cva.config'

const styles = cva({
    base: 'py-1 px-3 rounded-full border flex justify-start gap-1.5 items-center [&>div]:size-2 [&>div]:rounded-xs break-keep whitespace-nowrap font-bold text-sm text-black/80',
    variants: {
        color: {
            orange: 'border-orange-500 bg-orange-100 [&>div]:bg-orange-500',
            sky: 'border-sky-500 bg-sky-100 [&>div]:bg-sky-500',
            green: 'border-green-500 bg-green-100 [&>div]:bg-green-500',
            purple: 'border-purple-500 bg-purple-100 [&>div]:bg-purple-500',
        },
    },
})

export interface IconButtonProps extends VariantProps<typeof styles>,
    Omit<React.BaseHTMLAttributes<HTMLSpanElement>, 'color'>
{
    label: string,
    capsule?: boolean,
}

export const Badge = (props: IconButtonProps) => {
    const { label, color, capsule = false, className, ...rest } = props

    return (
        <span className={cx(styles({ color }), className)} {...rest}>
            {capsule && <div />}
            {label}
        </span>
    )
}
