<script lang="ts">
    import { goto } from "$app/navigation";
    import ListItem from "$lib/Components/ListItem/ListItem.svelte";
    import "../app.css";
    import { onDestroy, onMount } from "svelte";
    import { get } from "svelte/store";
    import type { ITotalContacts, Contact } from "$lib/types/contacts/types";
    import { contactsStore, totalContactStore } from "$lib/stores/contactStore";
    import { fetchContact } from "$lib/services/blipService";
    import { authToken } from "../lib/stores/auth";
    import { page } from "$app/stores";

    let contacts: Contact[] = [];
    let totalContacts: ITotalContacts = {} as ITotalContacts;
    let currentPage = 1;
    let itemsPerPage = 10;
    let totalPages = 0;
    let currentSkip = 0;
    let currentTake = 10;

    onMount(() => {
        const unsubscribe = page.subscribe(($page) => {
            const token = get(authToken);
            const query = $page.url.searchParams;
            const pageParam = query.get("page");

            const storedTotalPage = localStorage.getItem("totalContacts");

            if (storedTotalPage) {
                let value = JSON.parse(storedTotalPage);
                totalPages = Math.ceil(Number(value) / itemsPerPage);
            }

            if (pageParam) {
                currentPage = parseInt(pageParam, 10);
            }

            if (token) {
                authToken.set(token);
                goto(`/?page=${currentPage}`);
            } else {
                goto("/login");
            }

            const storedContacts = localStorage.getItem("contacts");
            if (storedContacts) {
                contactsStore.set(JSON.parse(storedContacts));
            }
        });

        return () => unsubscribe();
    });

    const unsubscribeContact = contactsStore.subscribe((value) => {
        contacts = value;
    });

    const unsubscribeTotalContact = totalContactStore.subscribe((value) => {
        totalContacts = { total: value };
        totalPages = Math.ceil(totalContacts.total / itemsPerPage);
    });

    function generateUUID() {
        return crypto.randomUUID();
    }

    const newId = generateUUID();

    const nextPage = async () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            currentSkip = (currentPage - 1) * itemsPerPage;
            const token = get(authToken);

            goto(`/?page=${currentPage}`);

            const response = await fetchContact({
                currentTake,
                currentSkip,
                token,
                id_contact: newId,
            });

            if (response && response.status === "success") {
                contactsStore.set(response.resource?.items as Contact[]);
                totalContactStore.set(response.resource.total);

                localStorage.setItem("contacts", JSON.stringify(response.resource?.items));
            } else {
                console.error("Erro ao buscar contatos:", response);
            }
        }
    };

    const prevPage = async () => {
        if (currentPage > 1) {
            currentPage -= 1;
            currentSkip = (currentPage - 1) * itemsPerPage;
            const token = get(authToken);

            goto(`/?page=${currentPage}`);

            const response = await fetchContact({
                currentTake,
                currentSkip,
                token,
                id_contact: newId,
            });

            if (response && response.status === "success") {
                contactsStore.set(response.resource?.items as Contact[]);
                totalContactStore.set(response.resource.total);

                localStorage.setItem("contacts", JSON.stringify(response.resource?.items));
            } else {
                console.error("Erro ao buscar contatos:", response);
            }
        }
    };

    onDestroy(() => {
        unsubscribeContact();
        unsubscribeTotalContact();
    });
</script>

<div class="container px-4 mx-auto lg:flex lg:justify-center flex-col py-8">
    <h1 class="lg:text-3xl text-2xl mb-4 text-gray-500">Contacts</h1>
    <ul class="min-h-[576px] w-full border rounded-md pl-3 pr-3 pt-1">
        {#if contacts.length}
            {#each contacts as contact}
                <ListItem name={contact.name} email={contact.email} idcontact={contact.identity} />
            {/each}
        {:else}
            <div class="min-h-[600px] flex justify-center">
                <div>
                    <h1>Sem contatos disponiveis</h1>
                </div>
            </div>
        {/if}
    </ul>
    <div class="flex justify-center items-center gap-10 mt-4">
        <button
            on:click={prevPage}
            class="lg:px-4 px-2 py-1.5 lg:py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-400"
            disabled={currentPage === 1}
        >
            Anterior
        </button>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
            Página {currentPage} de {totalPages}
        </span>
        <button
            on:click={nextPage}
            class="lg:px-4 px-2 py-1.5 lg:py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-400"
            disabled={currentPage === totalPages}
        >
            Próximo
        </button>
    </div>
</div>
