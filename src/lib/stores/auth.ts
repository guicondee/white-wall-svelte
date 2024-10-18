import { writable } from "svelte/store";

let storedToken: string | null = null;

if (typeof window !== "undefined") {
    storedToken = localStorage.getItem("authToken");
}

export const authToken = writable<string | null>(storedToken);

authToken.subscribe((value) => {
    if (typeof window !== "undefined" && value) {
        localStorage.setItem("authToken", value);
    }
});
