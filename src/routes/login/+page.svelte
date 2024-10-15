<script lang="ts">
    import Button from "$lib/Button/Button.svelte";
    import FormInputText from "$lib/Form/FormInputText/FormInputText.svelte";
    import { createEventDispatcher } from "svelte";
    import { z } from "zod";
    // import { authToken } from "../stores";

    import LogoWhiteWall from "../../assets/logo-whitewall.png";
    import { goto } from "$app/navigation";

    const schema = z.object({
        blip_hash: z.string().min(1, { message: "blip hash é obrigatório!" }),
    });

    let apiKey = "";
    let blip_hash = "";
    let errors: { blip_hash?: string[] } = {};

    const dispatch = createEventDispatcher();

    const validateForm = () => {
        const result = schema.safeParse({ blip_hash });
        if (!result.success) {
            errors = result.error.flatten().fieldErrors;
        } else {
            errors = {};
        }
        return result.success;
    };

    const onSubmit = async (event: Event) => {
        event.preventDefault();
        goto("/home");
        // if (validateForm()) {
        //     try {
        //         const response = await fetch(
        //             "https://api.blip.ai/api/v1/validate",
        //             {
        //                 method: "GET",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: `Key ${apiKey}`,
        //                 },
        //             },
        //         );
        //         if (response.ok) {
        //             // authToken.set(apiKey);
        //             alert("its ok");
        //         } else {
        //             errors.blip_hash = ["Chave de API inválida!"];
        //         }
        //     } catch (error) {
        //         errors.blip_hash = ["Erro ao conectar à API!"];
        //     }
        // }
    };
</script>

<div class="flex items-center justify-center min-h-screen bg-background-light">
    <div
        class="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-md"
    >
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

            <Button type="submit" variant="primary">Enviar</Button>
        </form>
    </div>
</div>

<style>
</style>
