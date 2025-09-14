import type { MaterialSymbolName } from '@/assets/icons/materialSymbols'

interface IconFamily { variant: 'outlined' | 'rounded' | 'sharp' }
interface IconFill { filled: true }
interface IconWeight { weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 }
type IconGrade = { emphasis: 'low' | 'default' | 'high', grade?: never }
    | { emphasis?: never, grade: -25 | 0 | 200 }
interface IconOpticalSize { opticalSize: 20 | 24 | 40 | 48 }

export type MaterialSymbolProps = { icon: MaterialSymbolName, className?: string }
    & Partial<IconFamily>
    & Partial<IconFill>
    & Partial<IconWeight>
    & Partial<IconGrade>
    & Partial<IconOpticalSize>

export const MaterialSymbol = (props: MaterialSymbolProps) => {
    const { icon, variant = 'outlined', filled = false, weight = 400, /* grade = 0, */ opticalSize = 24 } = props

    const variantClasses = { outlined: 'icon-outlined', rounded: 'icon-rounded', sharp: 'icon-sharp' }
    const weightClasses = {
        100: 'icon-100', 200: 'icon-200', 300: 'icon-300', 400: 'icon-400',
        500: 'icon-500', 600: 'icon-600', 700: 'icon-700',
    }
    const opticalSizeClasses = {
        20: 'icon-20', 24: 'icon-24', 40: 'icon-40', 48: 'icon-48',
    }

    const classes = `icon
        ${variantClasses[variant]}
        ${!filled ? 'icon-nofill' : 'icon-filled'}
        ${weightClasses[weight]}
        ${props.emphasis === 'low' || props.grade === -25 ? 'icon-dark' : (
            props.emphasis === 'high' || props.grade === 200 ? 'icon-emphasis' : 'icon-normal'
        )}
        ${opticalSizeClasses[opticalSize]}
        ${props.className ?? ''}
    `

    return <span className={classes}> {icon} </span>
}
