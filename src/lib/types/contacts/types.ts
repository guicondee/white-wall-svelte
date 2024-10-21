export interface ITotalContacts {
    total: number;
}

export interface Contact {
    identity: string
    name: string
    group: string
    lastMessageDate: string
    lastUpdateDate: string
    email: string
    gender: string
    extras: Extras
}

export interface Extras {
    email: string
    plan: string
    code: string
}


export type FetchContactPagination = {
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


export type FetchContactsProps = {
    url: string;
    token: string;
    body: any;
};


export type FetchMessagesByIdContactProps = {
    id_contact: string
    token: string | null
}

export interface IFetchMessagesByIdContact {
    resource: Resource
}


  export interface Resource {
    total: number
    itemType: string
    items: Item[]
}
  
  export interface Item {
    id: string
    direction: string
    type: string
    content: string
    date: string
    status: string
    reason: Reason
    metadata: Metadata
  }
  
  export interface Reason {
    code: number
    description: string
  }
  
  export interface Metadata {
    $elapsedTimeToStorage: string
    traceparent: string
    $internalId: string
    $originatorSessionRemoteNode: string
    "#uniqueId": string
    "#date_processed": string
    "#messageKind": string
    date_created: string
  }
  


