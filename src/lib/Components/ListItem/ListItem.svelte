<!-- ContactItem.svelte -->
<script>
    import { goto } from "$app/navigation";
    import { authToken } from "../../stores/auth";
    import { fetchMessagesByIdContact } from "$lib/services/blipService";
    import { get } from "svelte/store";

    export let name = "";
    export let email = "";
    export let idcontact = "";
    let messagesByIdContact = [];

    const token = get(authToken);

    const navigateToConversation = () => {
        goto(`/contacts/${idcontact}`);
        fetchMessagesByIdContact({ id_contact: idcontact, token });
    };
</script>

<li class="py-2 border-b border-gray-200">
    <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-shrink-0">
            <div class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                <span>{name.charAt(0)}</span>
            </div>
        </div>
        <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-cyan-600">{name}</p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">{email}</p>
        </div>
        <button
            on:click={navigateToConversation}
            class="inline-flex items-center px-2 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
            Ver Conversa
        </button>
    </div>
</li>
