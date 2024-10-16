<script lang="ts">
    import { goto } from "$app/navigation";
    import ListItem from '$lib/ListItem/ListItem.svelte'
    // import { authToken } from "../stores";
    import { onMount } from "svelte";

    interface Contact {
        identity: string;
        name: string;
        gender: string;
        group: string;
        email: string
    }

    let contacts: Contact[] = [];
    let currentPage = 1;
    let itemsPerPage = 10;

    let contacts2 = [
    { name: 'Neil Sims', email: 'email@flowbite.com', contactId: '12345' },
    { name: 'Bonnie Green', email: 'email@flowbite.com', contactId: '67890' },
    { name: 'Michael Gough', email: 'email@flowbite.com', contactId: '54321' },
    { name: 'Thomas Lean', email: 'email@flowbite.com', contactId: '09876' },
    { name: 'Lana Byrd', email: 'email@flowbite.com', contactId: '13579' },
    { name: 'Alice Smith', email: 'alice@flowbite.com', contactId: '24680' },
    { name: 'Bob Johnson', email: 'bob@flowbite.com', contactId: '13568' },
    { name: 'Charlie Brown', email: 'charlie@flowbite.com', contactId: '86420' },
    { name: 'Diana Prince', email: 'diana@flowbite.com', contactId: '97531' },
    { name: 'Ethan Hunt', email: 'ethan@flowbite.com', contactId: '25874' },
    // { name: 'Fiona Apple', email: 'fiona@flowbite.com', contactId: '96358' },
    // { name: 'George Clooney', email: 'george@flowbite.com', contactId: '74120' },
  ];

  // Calcular total de páginas
  const totalPages = Math.ceil(contacts2.length / itemsPerPage);

  // Função para obter contatos da página atual
  const paginatedContacts = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return contacts.slice(start, start + itemsPerPage);
  };

  // Funções para navegação
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
 
</script>

<div class="container mx-auto flex justify-center flex-col  py-8">
    <h1 class="text-3xl mb-4 text-gray-500">Contacts</h1>
    <ul class="max-h-[700px] w-full border rounded-md pl-3 pr-3 pt-1  ">
        {#each contacts2 as contact}
          <ListItem
          name={contact.name}
          email={contact.email}
          contactId={contact.contactId}
          />
        {/each}
    </ul>
    <div class="flex justify-center items-center gap-10 mt-4">
        <button
          on:click={prevPage}
          class="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-blue-700  dark:hover:bg-blue-600"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
          Página {currentPage} de {totalPages}
        </span>
        <button
          on:click={nextPage}
          class="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-blue-700  "
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
</div>
