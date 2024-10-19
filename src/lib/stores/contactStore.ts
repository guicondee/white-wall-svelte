
import type { Contact } from "$lib/types/contacts/types";
import { writable } from "svelte/store";

export const contactsStore = writable<Contact[]>([]);

export const totalContactStore = writable<number>(0)

