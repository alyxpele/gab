import type { MaterialSymbolName } from '@/assets/icons/materialSymbols'
import { cva, type VariantProps } from '@/components/utils/cva.config'

const styles = cva({
    base: 'icon',
    variants: {
        variant: {
            outlined: 'icon-outlined',
            rounded: 'icon-rounded',
            sharp: 'icon-sharp',
        },
        filled: {
            true: 'icon-filled',
            false: 'icon-nofill',
        },
        weight: {
            100: 'icon-100',
            200: 'icon-200',
            300: 'icon-300',
            400: 'icon-400',
            500: 'icon-500',
            600: 'icon-600',
            700: 'icon-700',
        },
        grade: {
            [-25]: 'icon-dark',
            0: 'icon-normal',
            200: 'icon-emphasis',
        },
        opticalSize: {
            20: 'icon-20',
            24: 'icon-24',
            40: 'icon-40',
            48: 'icon-48',
        },
    },
    // defaultVariants: {
    //     variant: 'outlined',
    //     filled: false,
    //     weight: 400,
    //     grade: 0,
    //     opticalSize: 24,
    // },
})

export interface MaterialSymbolProps extends VariantProps<typeof styles>,
    Pick<React.BaseHTMLAttributes<HTMLSpanElement>, 'className'> {
    icon: MaterialSymbolName,
}

export const MaterialSymbol = (props: MaterialSymbolProps) => {
    const { icon, ...rest } = props
    const classes = styles(rest)

    return (
        <span className={classes}>{icon}</span>
    )
}
