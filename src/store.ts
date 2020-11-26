import { writable } from "svelte/store";

export const loading = writable(true);
export const isAuthenticated = writable(false);
export const user =  writable({});
export const popupOpen = writable(false)
export const error = writable(null);