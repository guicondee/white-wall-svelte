<script lang="ts">
    import { goto } from "$app/navigation";

    // import { authToken } from "../stores";
    import { onMount } from "svelte";

    interface Contact {
        id: string;
        name: string;
    }

    let contacts: Contact[] = [];
    let currentPage = 1;
    let itemsPerPage = 10;

    onMount(async () => {
        // const token = $authToken;
        // if (!token) {
        //     goto("/login");
        //     return;
        // }
        // await fetchContacts(token);
    });

    const fetchContacts = async (token: string) => {
        const response = await fetch(
            `https://api.blip.ai/api/v1/contacts?page=${currentPage}&size=${itemsPerPage}`,
            {
                headers: {
                    Authorization: `Key ${token}`,
                },
            },
        );

        if (response.ok) {
            const data = await response.json();
            contacts = data.items as Contact[];
        }
    };

    const handleContactClick = (contactId: string) => {
        goto(`/contato/${contactId}`);
    };
</script>

<div class="container mx-auto py-8">
    <h1 class="text-3xl mb-4">Lista de Contatos</h1>
    <ul>
        {#each contacts as contact}
            <li class="p-4 border-b">
                <button
                    type="button"
                    class="w-full text-left"
                    on:click={() => handleContactClick(contact.id)}
                    on:keydown={(e) =>
                        e.key === "Enter" && handleContactClick(contact.id)}
                >
                    {contact.name || "Contato Anônimo"}
                </button>
            </li>
        {/each}
    </ul>
</div>
