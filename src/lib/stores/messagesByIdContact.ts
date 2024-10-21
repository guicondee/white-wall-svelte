import type { IFetchMessagesByIdContact } from "$lib/types/contacts/types";
import { writable } from "svelte/store";



export const messageByIdContactStore = writable<IFetchMessagesByIdContact>({} as IFetchMessagesByIdContact);
