import { Select as BaseSelect } from '@base-ui-components/react'
import { MaterialSymbolName } from '@/assets/icons/materialSymbols'
import { MaterialSymbol } from '../MaterialSymbols'
import { rcx } from '@/components/utils/cva.config'

export interface SelectProps<T, U extends boolean | undefined>
    extends React.ComponentProps<typeof BaseSelect.Root<T, U>>
{
    icon?: MaterialSymbolName,
    renderValue?: (value: Array<T> | T) => React.ReactNode,
    useRenderValueInPoppup?: boolean,
    classes?: Partial<Record<'trigger' | 'value' | 'icon' | 'positioner' | 'popup' | 'item' | 'itemIndicator', string>>,
}

export const Select = <T extends string, U extends boolean | undefined>(props: SelectProps<T, U>) => {
    const {
        icon,
        renderValue,
        useRenderValueInPoppup = false,
        classes: classOverrides,
        ...rest
    } = props
    const classes = rcx({
        trigger: 'flex h-10 min-w-36 items-center justify-between gap-3 rounded-md border border-gray-200 px-3 text-base select-none data-[popup-open]:bg-black/10 cursor-default hover:bg-black/10 active:bg-black/15 transition-all duration-200 ease-in-out',
        value: 'grow flex flex-nowrap overflow-x-hidden mask-r-from-85% justify-start gap-1 items-center',
        icon: 'flex text-black/50',
        positioner: 'outline-none select-none z-10',
        popup: 'bg-neutral-50 text-black/90 relative z-10 max-h-[var(--available-height)] min-w-[var(--anchor-width)] overflow-x-hidden overflow-y-auto rounded-md border border-neutral-400 p-1 shadow-md',
        item: 'hover:bg-black/10 active:bg-black/15 data-highlighted:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        itemIndicator: 'absolute right-2 flex items-center justify-center',
    }, classOverrides)

    const items = props.items !== undefined ? (
        props.items instanceof Array ? props.items : Object.entries(props.items)
            .map(([value, label]) => ({ label, value: value as T }))
    ) : []

    return (
        <BaseSelect.Root {...rest}>
            <BaseSelect.Trigger className={classes.trigger}>
                {renderValue !== undefined ? (
                    <BaseSelect.Value className={classes.value}>
                        {renderValue}
                    </BaseSelect.Value>
                ) : null}
                {icon !== undefined ? (
                    <BaseSelect.Icon className={classes.icon}>
                        <MaterialSymbol icon={icon} />
                    </BaseSelect.Icon>
                ) : null}
            </BaseSelect.Trigger>
            <BaseSelect.Portal>
                <BaseSelect.Positioner className={classes.positioner} sideOffset={8}>
                    <BaseSelect.Popup className={classes.popup}>
                        {items.map(({ value, label }) => (
                            <BaseSelect.Item key={value} value={value} className={classes.item}>
                                <BaseSelect.ItemText>
                                    {useRenderValueInPoppup && renderValue ? (
                                        renderValue(props.multiple ? [value] : value)
                                    ) : label}
                                </BaseSelect.ItemText>
                                <BaseSelect.ItemIndicator className={classes.itemIndicator}>
                                    <MaterialSymbol icon="check" />
                                </BaseSelect.ItemIndicator>
                            </BaseSelect.Item>
                        ))}
                    </BaseSelect.Popup>
                    <BaseSelect.ScrollDownArrow className={classes.itemIndicator} />
                </BaseSelect.Positioner>
            </BaseSelect.Portal>
        </BaseSelect.Root>
    )
}
