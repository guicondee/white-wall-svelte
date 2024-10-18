<script lang="ts">
    export let label: string = "";
    export let id: string = "";
    export let placeholder: string = "";
    export let value: string = "";
    export let error: string | null = null;

    const handleInput = (event: Event) => {
        value = (event.target as HTMLInputElement).value;
    };
</script>

<div class="mb-4">
    {#if label}
        <label class="block text-sm font-medium text-gray-700" for={id}>
            {label}
        </label>
    {/if}

    <input
        {id}
        type="text"
        on:input={handleInput}
        {placeholder}
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
        class:border-red-500={!!error}
    />

    {#if error}
        <p class="mt-2 text-sm text-red-600">
            {error}
        </p>
    {/if}
</div>
