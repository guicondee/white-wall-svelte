<script lang="ts">
    import { tv } from "tailwind-variants";

    type Variant = "primary" | "outline";

    export let variant: Variant = "primary";
    export let className: string = "";

    const buttonTv = tv({
        base: [],
        variants: {
            variant: {
                primary:
                    "w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50",
                outline: "px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-400",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    });
</script>

<button class={buttonTv({ variant, className })} {...$$restProps}>
    <slot></slot>
</button>
