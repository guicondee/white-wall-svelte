<script lang="ts">
    import Button from "$lib/Components/Button/Button.svelte";
    import FormInputText from "$lib/Components/Form/FormInputText/FormInputText.svelte";
    import { z } from "zod";
    import { authToken } from "../../lib/stores/auth";
    import { goto } from "$app/navigation";
    import LogoWhiteWall from "../../assets/logo-whitewall.png";
    import { fetchContacts } from "$lib/services/blipService";
    import { contactsStore } from "$lib/stores/contactStore";
    import type { IContact } from "$lib/types/contacts/types";
    import { pagination } from "$lib/stores/paginationStore";

    const schema = z.object({
        blip_hash: z.string().min(1, { message: "Chave de API Blip é obrigatório!" }),
    });

    let blip_hash = "";
    let errors: { blip_hash?: string[] } = {};
    let isLoading = false;

    const validateForm = () => {
        const result = schema.safeParse({ blip_hash });
        if (!result.success) {
            errors = result.error.flatten().fieldErrors;
        } else {
            errors = {};
        }
        return result.success;
    };

    function generateUUID() {
        return crypto.randomUUID();
    }

    const newId = generateUUID();

    const onSubmit = async (event: Event) => {
        event.preventDefault();
        if (validateForm()) {
            isLoading = true;
            let currentSkip, currentTake;

            pagination.subscribe(({ skip, take }) => {
                currentSkip = skip;
                currentTake = take;
            });

            try {
                const response = await fetchContacts({
                    url: "https://guilherme-conde-ztn5p.http.msging.net/commands",
                    token: blip_hash,
                    body: {
                        id: newId,
                        to: "postmaster@crm.msging.net",
                        method: "get",
                        uri: `/contacts?$skip=${currentSkip}&$take=${currentTake}`,
                    },
                });

                if (response.status === "success") {
                    authToken.set(blip_hash);
                    localStorage.setItem("authToken", blip_hash);
                    localStorage.setItem("contacts", JSON.stringify(response.items));
                    contactsStore.set(response.resource.items as IContact[]);
                    goto("/");
                } else {
                    errors.blip_hash = ["Chave de API inválida!"];
                }
            } catch (error) {
                errors.blip_hash = ["Chave de API inválida!"];
            } finally {
                isLoading = false;
            }
        }
    };
</script>

<div class="flex items-center justify-center min-h-screen bg-background-light">
    <div class="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-md">
        <div class="flex justify-center mb-6">
            <img src={LogoWhiteWall} alt="Logo" class="h-14" />
        </div>

        <form on:submit={onSubmit}>
            <FormInputText
                label="Blip Hash"
                id="blip_hash"
                placeholder="Digite o Blip Hash"
                bind:value={blip_hash}
                error={errors.blip_hash && errors.blip_hash[0]}
            />

            <Button type="submit" variant="primary">
                {#if isLoading}
                    Carregando...
                {:else}
                    Enviar
                {/if}
            </Button>
        </form>
    </div>
</div>

<style>
    /* Seu CSS personalizado */
</style>
