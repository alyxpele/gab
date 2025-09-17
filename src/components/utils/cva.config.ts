import { defineConfig } from 'cva'
import { twMerge } from 'tailwind-merge'

const debugClasses = twMerge(
    // 'outline outline-pink-500',
    // 'bg-pink-700/8',
    // 'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-pink-500',
)

export const { cva, cx, compose } = defineConfig({
    hooks: {
        onComplete: import.meta.env.DEV ? (className) => {
            const res = twMerge(className, debugClasses)

            if (res !== className) {
                const A = className.split(' ')
                const B = res.split(' ')
                console.debug('[twMerge]', A.filter((x) => !B.includes(x)), '->', B.filter((x) => !A.includes(x)))
            }
            return res
        } : (className) => twMerge(className),
    },
})

export const rcx = <T extends string>(
    classes: Record<T, string>,
    extend?: string | Partial<Record<T, string>>,
): Record<T, string> => {
    return (Object.entries(classes) as Array<[T, string]>)
        .reduce((r, [key, className]) => {
            r[key] = cx(className, typeof extend === 'string' ? extend : extend?.[key])
            return r
        }, {} as Record<T, string>)
}

export { type VariantProps } from 'cva'
