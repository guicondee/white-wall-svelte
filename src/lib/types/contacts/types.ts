export interface ITotalContacts {
    total: number;
}



export interface Contact {
    name: string
    group: string
    lastMessageDate: string
    lastUpdateDate: string
    identity: string
    email: string
    gender: string
    extras: Extras
}

export interface Extras {
    email: string
    plan: string
    code: string
}


