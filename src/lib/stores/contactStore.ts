
import type { IContact } from "$lib/types/contacts/types";
import { writable } from "svelte/store";

export const contactsStore = writable<IContact[]>([]);
