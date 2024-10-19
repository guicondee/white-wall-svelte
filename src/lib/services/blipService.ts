import { authToken } from "$lib/stores/auth";

// const token = authToken

type FetchContactsProps = {
    url: string;
    token: string;
    body: any;
};

export async function fetchContactsOnSubmitLogin({ body, token, url }: FetchContactsProps) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Key ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("Erro ao se comunicar com a API do Blip");
    }

    return response.json();
}


type FetchContactPagination = {
    id_contact: string;
    currentSkip: number;
    currentTake: number;
    token: string | null;

}
export interface IFetchContactPagination {
    type: string
    resource: Resource
    method: string
    status: string
    id: string
    from: string
    to: string
    metadata: Metadata
}

export interface Resource {
    total: number
    itemType: string
    items: Item[]
}

export interface Item {
    name: string
    group: string
    lastMessageDate: string
    lastUpdateDate: string
    identity: string
    email?: string
    gender: string
    extras: Extras
}

export interface Extras {
    email: string
    plan: string
    code: string
}

export interface Metadata {
    traceparent: string
    "#command.uri": string
}

export async function fetchContact({ currentSkip, currentTake, token, id_contact }: FetchContactPagination): Promise<IFetchContactPagination | null> {
    try {
        const response = await fetch("https://guilherme-conde-ztn5p.http.msging.net/commands", {
            method: "POST",
            headers: {
                Authorization: `Key ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id_contact,
                to: "postmaster@crm.msging.net",
                method: "get",
                uri: `/contacts?$skip=${currentSkip}&$take=${currentTake}`,
            })
        });

        if (response.ok) {
            const data: IFetchContactPagination = await response.json(); // Definindo o tipo da resposta

            if (data.status === "success") {
                return data; // Retorne o objeto completo
            } else {
                console.log("Error: ", data); // Exibe o erro detalhado
                return null; // Retorna null se não for sucesso
            }
        } else {
            console.log("Erro na requisição! Código de status: " + response.status);
            return null; // Retorna null em caso de erro na requisição
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
        return null; // Retorna null em caso de erro
    }
}

type FetchMessagesByIdContactProps = {
    id_contact: string
    token: string | null
}

export async function fetchMessagesByIdContact({ id_contact, token }: FetchMessagesByIdContactProps) {
    try {
        const response = await fetch("https://guilherme-conde-ztn5p.http.msging.net/commands", {
            method: "POST",
            headers: {
                Authorization: `Key ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id_contact,
                method: "get",
                uri: `/threads/${id_contact}?refreshExpiredMedia=true`,
            })
        });

        // if (response.ok) {
        //     const data: IFetchContactPagination = await response.json(); // Definindo o tipo da resposta

        //     if (data.status === "success") {
        //         return data; // Retorne o objeto completo
        //     } else {
        //         console.log("Error: ", data); // Exibe o erro detalhado
        //         return null; // Retorna null se não for sucesso
        //     }
        // } else {
        //     console.log("Erro na requisição! Código de status: " + response.status);
        //     return null; // Retorna null em caso de erro na requisição
        // }
    } catch (error) {
        console.log("Erro na requisição:", error);
        return null; // Retorna null em caso de erro
    }
}


type MessageProps = {
    token: string | null
}

export async function sendMessage({ token }: MessageProps) {
    try {
        const response = await fetch("https://guilherme-conde-ztn5p.http.msging.net/messages", {
            method: "POST",
            headers: {
                Authorization: `Key ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: "4895483784334531164",
                from: "11121023102013020@messenger.gw.msging.net",
                to: "guilherme-conde-ztn5p",
                type: "text/plain",
                content: "Pode fwefwefew"
            })
        });

        const data = response
        console.log(data, "messages")

        // if (response.ok) {
        //     const data: IFetchContactPagination = await response.json(); // Definindo o tipo da resposta

        //     if (data.status === "success") {
        //         return data; // Retorne o objeto completo
        //     } else {
        //         console.log("Error: ", data); // Exibe o erro detalhado
        //         return null; // Retorna null se não for sucesso
        //     }
        // } else {
        //     console.log("Erro na requisição! Código de status: " + response.status);
        //     return null; // Retorna null em caso de erro na requisição
        // }
    } catch (error) {
        console.log("Erro na requisição:", error);
        return null; // Retorna null em caso de erro
    }
}


