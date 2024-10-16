<script lang="ts">
    interface Message {
        id: string;
        direction: "sent" | "received";
        timestamp: string;
        content: string;
    }

    // Exemplo de dados de mensagens
    const messages: Message[] = [
        { id: "1", direction: "sent", timestamp: "2024-10-15T12:34:56.000Z", content: "Oi, tudo bem?" },
        {
            id: "2",
            direction: "received",
            timestamp: "2024-10-15T12:35:00.000Z",
            content: "Olá, posso te ajudar em algo?",
        },
        {
            id: "3",
            direction: "sent",
            timestamp: "2024-10-15T12:36:20.000Z",
            content: "Quero saber mais sobre o seu serviço.",
        },
        {
            id: "4",
            direction: "received",
            timestamp: "2024-10-15T12:37:10.000Z",
            content: "Claro, estamos aqui para ajudar!",
        },
        {
            id: "5",
            direction: "sent",
            timestamp: "2024-10-15T12:38:30.000Z",
            content: "Como funciona a integração com outras plataformas?",
        },
        {
            id: "6",
            direction: "received",
            timestamp: "2024-10-15T12:39:45.000Z",
            content: "Podemos integrar com diversas plataformas, como você prefere proceder?",
        },
        {
            id: "7",
            direction: "sent",
            timestamp: "2024-10-15T12:40:50.000Z",
            content: "Preciso de detalhes sobre as opções de pagamento.",
        },
        {
            id: "8",
            direction: "received",
            timestamp: "2024-10-15T12:42:00.000Z",
            content: "Temos várias opções, posso enviar as informações por e-mail?",
        },
        { id: "9", direction: "sent", timestamp: "2024-10-15T12:43:30.000Z", content: "Perfeito, muito obrigado!" },
        {
            id: "10",
            direction: "received",
            timestamp: "2024-10-15T12:44:00.000Z",
            content: "De nada! Estamos à disposição.",
        },
        {
            id: "11",
            direction: "received",
            timestamp: "2024-10-15T12:41:00.000Z",
            content: "Por nada! Posso te ajudar em mais alguma coisa?",
        },
        {
            id: "12",
            direction: "sent",
            timestamp: "2024-10-15T12:42:00.000Z",
            content: "Não, só isso mesmo. Até mais!",
        },
        {
            id: "13",
            direction: "received",
            timestamp: "2024-10-15T12:42:30.000Z",
            content: "Até mais! Tenha um ótimo dia!",
        },
        {
            id: "14",
            direction: "sent",
            timestamp: "2024-10-15T13:00:00.000Z",
            content: "Oi, estou com um problema no meu pedido #91011.",
        },
        {
            id: "15",
            direction: "received",
            timestamp: "2024-10-15T13:00:30.000Z",
            content: "Lamento saber disso. Qual é o problema com o pedido?",
        },
        {
            id: "16",
            direction: "sent",
            timestamp: "2024-10-15T13:01:10.000Z",
            content: "Ele chegou danificado. O que posso fazer?",
        },
        {
            id: "17",
            direction: "received",
            timestamp: "2024-10-15T13:02:00.000Z",
            content: "Sinto muito por isso! Podemos providenciar uma troca ou um reembolso. O que você prefere?",
        },
        {
            id: "18",
            direction: "sent",
            timestamp: "2024-10-15T13:02:30.000Z",
            content: "Prefiro uma troca.",
        },
        {
            id: "19",
            direction: "received",
            timestamp: "2024-10-15T13:03:00.000Z",
            content: "Ok, já iniciamos o processo de troca. Você receberá mais informações por e-mail.",
        },
        {
            id: "20",
            direction: "sent",
            timestamp: "2024-10-15T13:03:30.000Z",
            content: "Muito obrigado!",
        },
    ];

    function formatTimestamp(timestamp: string) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
</script>

<div class="container mx-auto w-full flex justify-center py-8">
    <div class="flex flex-col mt-20">
        <div>
            <h1 class="text-3xl mb-4 text-gray-500">Messages By Id_contact</h1>
        </div>

        <div>
            <ul class="space-y-4 border w-[1000px] rounded-md shadow-md p-4">
                {#each messages as message}
                    <li class="flex items-start {message.direction === 'sent' ? 'justify-end' : 'justify-start'}">
                        {#if message.direction === "sent"}
                            <div class="flex flex-row space-x- space-x-3">
                                <div class="max-w-xs">
                                    <div class="bg-blue-100 p-3 rounded-lg">
                                        <p class="text-sm">{message.content}</p>
                                    </div>
                                    <span class="text-xs text-gray-500 float-right mt-2"
                                        >{formatTimestamp(message.timestamp)}</span
                                    >
                                </div>

                                <div class="flex-shrink-0">
                                    <div
                                        class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white"
                                    >
                                        <span>U</span>
                                    </div>
                                </div>
                            </div>
                        {:else}
                            <div class="flex space-x-3">
                                <div class="flex-shrink-0">
                                    <div
                                        class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white"
                                    >
                                        <span>B</span>
                                    </div>
                                </div>

                                <div class="max-w-xs">
                                    <div class="bg-gray-100 p-3 rounded-lg">
                                        <p class="text-sm">{message.content}</p>
                                    </div>
                                    <span class="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
                                </div>
                            </div>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<style>
    /* Adiciona um scroll se houver muitas mensagens */
    ul {
        max-height: 60vh;
        overflow-y: auto;
    }

    ::-webkit-scrollbar-track {
        background: transparent !important;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f0f0f0;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #d4d4d8;
        border-radius: 10px;
        border: 2px solid #f0f0f0;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a1a1aa;
    }
</style>
