type FetchContactsProps = {
    url: string;
    token: string;
    body: any;
};

export async function fetchContacts({ body, token, url }: FetchContactsProps) {
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
