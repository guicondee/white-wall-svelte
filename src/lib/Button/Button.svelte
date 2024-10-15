<script lang="ts">
    import { tv } from "tailwind-variants";

    type Variant = "primary" | "outline" | "delete_trash";

    type ButtonType = "button" | "submit" | "reset";

    export let variant: Variant = "primary";
    export let className: string = "";
    export let type: ButtonType = "button";

    const buttonTv = tv({
        base: [],
        variants: {
            variant: {
                primary:
                    "w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50",
                outline: " ",
                delete_trash:
                    "rounded-md px-[6px] py-[6px] hover:bg-zinc-100 shadow-none text-zinc-500 dark:hover:bg-white/5 dark:text-zinc-400 dark:focus-within:ring-[#CD0000]",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    });
</script>

<button class={buttonTv({ variant, className })} {type}>
    <slot></slot>
</button>
