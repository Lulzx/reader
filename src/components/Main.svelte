<script lang="ts">
  import { onMount } from "svelte";
  import auth from "../authService";
  import { isAuthenticated, user } from "../store";
  import type Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

  let dropdown_open: boolean;
  let auth0Client: Auth0Client;

  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  function logout() {
    auth.logout(auth0Client);
  }
  function toggle_dropdown() {
    dropdown_open = !dropdown_open || false;
  }
</script>

<div class="relative">
  <button
    on:click={toggle_dropdown}
    class="absolute top-0 right-0 z-10 block rounded-md bg-gray-100 p-2 focus:outline-none">
    <svg
      class="h-5 w-5 text-gray-800"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd" />
    </svg>
  </button>
  {#if dropdown_open}
    <div
      class="absolute top-7 right-0 mt-2 py-2 w-48 bg-gray-100 rounded-md shadow-xl z-20">
      <a
        href="#!"
        class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
        your profile
      </a>
      <a
        href="#!"
        class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
        Your books
      </a>
      <a
        href="#!"
        class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
        Help
      </a>
      <a
        href="#!"
        class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
        Settings
      </a>
      <a
        href="#!"
        on:click={logout}
        class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
        Sign Out
      </a>
    </div>
  {/if}
</div>
<div
  class="flex max-w-sm w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
  <div class="flex justify-center items-center w-12 bg-green-500">
    <svg
      class="h-6 w-6 fill-current text-white"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
    </svg>
  </div>
  <div class="-mx-3 py-2 px-4">
    <div class="mx-3">
      <span class="text-green-500 font-semibold">Success</span>
      <p class="text-gray-600 text-sm">You are now logged in!</p>
    </div>
  </div>
</div>
