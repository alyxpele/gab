import { defineConfig } from 'cva'
import { twMerge } from 'tailwind-merge'

export const { cva, cx, compose } = defineConfig({
    hooks: {
        onComplete: import.meta.env.DEV ? (className) => {
            const res = twMerge(className)

            if (res !== className) {
                console.debug('[twMerge]', className, '->', res)
            }
            return res
        } : (className) => twMerge(className),
    },
})

export { type VariantProps } from 'cva'
