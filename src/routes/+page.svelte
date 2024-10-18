<script lang="ts">
    import { goto } from "$app/navigation";
    import ListItem from "$lib/Components/ListItem/ListItem.svelte";
    import "../app.css";
    import { onDestroy, onMount } from "svelte";
    import { authToken } from "../lib/stores/auth";
    import { get } from "svelte/store";
    import type { IContact } from "$lib/types/contacts/types";
    import { contactsStore } from "$lib/stores/contactStore";

    let contacts: IContact[] = [];
    let currentPage = 1;
    let itemsPerPage = 10;
    let totalContacts = 0;

    const totalPages = Math.ceil(totalContacts / itemsPerPage);

    const unsubscribe = contactsStore.subscribe((value) => {
        contacts = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    const paginatedContacts = () => {
        const start = (currentPage - 1) * itemsPerPage;
        return contacts.slice(start, start + itemsPerPage);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            currentPage += 1;
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            currentPage -= 1;
        }
    };

    onMount(() => {
        const token = get(authToken);

        if (!token) {
            goto("/login");
        } else {
            goto("/");
        }
    });
</script>

<div class="container mx-auto flex justify-center flex-col py-8">
    <h1 class="text-3xl mb-4 text-gray-500">Contacts</h1>
    <ul class="max-h-[700px] w-full border rounded-md pl-3 pr-3 pt-1">
        {#if contacts?.length > 0}
            {#each paginatedContacts() as contact}
                <ListItem name={contact.name} email={contact.email} contactId={contact.identity} />
            {/each}
        {:else}
            <div class="min-h-[600px]">
                <h1>Sem contatos disponiveis</h1>
            </div>
        {/if}
    </ul>
    <div class="flex justify-center items-center gap-10 mt-4">
        <button
            on:click={prevPage}
            class="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-blue-700"
            disabled={currentPage === 1}
        >
            Anterior
        </button>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
            Página {currentPage} de {totalPages}
        </span>
        <button
            on:click={nextPage}
            class="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-blue-700"
            disabled={currentPage === totalPages}
        >
            Próximo
        </button>
    </div>
</div>
