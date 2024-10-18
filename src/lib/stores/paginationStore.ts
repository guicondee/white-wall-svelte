import {writable} from 'svelte/store'

export const pagination = writable({skip: 0, take: 10})