import type { FetchContactPagination, FetchContactsProps, FetchMessagesByIdContactProps, IFetchContactPagination, IFetchMessagesByIdContact } from "$lib/types/contacts/types";


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



export async function fetchMessagesByIdContact({ id_contact, token }: FetchMessagesByIdContactProps): Promise<IFetchMessagesByIdContact | null> {
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

        if (response.ok) {
            const data: IFetchMessagesByIdContact = await response.json();  

            return data; 
          
        } else {
            console.log("Erro na requisição! Código de status: " + response.status);
            return null
           
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
       return null
    }
}
