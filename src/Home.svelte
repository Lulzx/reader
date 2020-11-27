<script>
  import { onMount } from "svelte";
  import auth from "./authService";
  import { isAuthenticated, user } from "./store";
  import Task from "./components/Task.svelte";
  import type Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";

  let auth0Client: Auth0Client;

  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  function login() {
    // @ts-ignore
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }
</script>

<main>
  {#if !$isAuthenticated}
    <div class="min-h-screen py-12 bg-gray-200" subpixel-antialiased>
      <section>
        <h2
          class="px-5 mt-2 text-3xl font-black leading-tight text-center text-gray-800 sm:mt-0 sm:px-0 sm:text-6xl">
          Shoten Reader
        </h2>
        <p class="text-center text-2xl text-gray-600 text-md italic">
          Reading Reimagined
        </p>
        <div class="content-center lg:flex lg:justify-center lg:items-center">
          <div
            class="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8">
            <div class="relative w-64 h-48">
              <div
                class="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                <div class="w-1/3 h-40" />
                <div class="w-2/3 h-32 pr-4">
                  <h3 class="pt-1 text-xl font-semibold text-gray-700">
                    Read regularly
                  </h3>
                  <p class="pt-1 text-sm text-gray-600">
                    Develop reading
                    <b>habit</b>
                    and
                    <b>continue</b>
                    from where you left.
                  </p>
                </div>
              </div>
              <div
                class="absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <svg
                  class="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#e53e3e"
                  width="32px"
                  height="32px">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <div
                class="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-red-600 rounded-lg">
                01
              </div>
              <div
                class="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-red-600" />
            </div>
          </div>
          <div
            class="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8">
            <div class="relative w-64 h-48">
              <div
                class="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                <div class="w-1/3 h-40" />
                <div class="w-2/3 h-32 pr-4">
                  <h3 class="pt-1 text-xl font-semibold text-gray-700">
                    Track content
                  </h3>
                  <p class="pt-1 text-sm text-gray-600">
                    Go beyond time tracking,
                    <b>visualize what</b>
                    you are reading.
                  </p>
                </div>
              </div>
              <div
                class="absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <svg
                  class="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  viewBox="0 0 24 24"
                  fill="#38a169"
                  width="32px"
                  height="32px">
                  <g>
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <g>
                    <g>
                      <path
                        d="M6.36,18.78L6.61,21l1.62-1.54l2.77-7.6c-0.68-0.17-1.28-0.51-1.77-0.98L6.36,18.78z" />
                      <path
                        d="M14.77,10.88c-0.49,0.47-1.1,0.81-1.77,0.98l2.77,7.6L17.39,21l0.26-2.22L14.77,10.88z" />
                      <path
                        d="M15,8c0-1.3-0.84-2.4-2-2.82V3h-2v2.18C9.84,5.6,9,6.7,9,8c0,1.66,1.34,3,3,3S15,9.66,15,8z M12,9c-0.55,0-1-0.45-1-1 c0-0.55,0.45-1,1-1s1,0.45,1,1C13,8.55,12.55,9,12,9z" />
                    </g>
                  </g>
                </svg>
              </div>
              <div
                class="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-green-600 rounded-lg">
                02
              </div>
              <div
                class="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-green-600" />
            </div>
          </div>
          <div
            class="flex justify-center pt-10 m-auto lg:w-1/4 lg:mx-6 lg:my-8">
            <div class="relative w-64 h-48">
              <div
                class="absolute top-0 left-0 flex items-center w-64 h-40 mt-6 ml-6 bg-white border-8 border-gray-700 border-solid rounded-lg">
                <div class="w-1/3 h-40" />
                <div class="w-2/3 h-32 pr-4">
                  <h3 class="pt-1 text-xl font-semibold text-gray-700">
                    Explore more
                  </h3>
                  <p class="pt-1 text-sm text-gray-600">
                    Find
                    <b>various topics</b>
                    based on the books and articles you read.
                  </p>
                </div>
              </div>
              <div
                class="absolute top-0 left-0 z-20 w-12 h-12 mt-6 ml-6 bg-white rounded-full">
                <svg
                  class="mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#3182ce"
                  width="32px"
                  height="32px">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
              </div>
              <div
                class="absolute top-0 left-0 z-10 w-24 h-40 py-20 text-5xl font-bold text-center text-white bg-blue-600 rounded-lg">
                03
              </div>
              <div
                class="absolute top-0 left-0 z-30 w-24 h-2 mt-40 ml-48 bg-blue-600" />
            </div>
          </div>
        </div>
        <div
          class="content-center mt-12 sm:flex sm:justify-center sm:items-center md:flex md:justify-center md:items-center lg:flex lg:justify-center lg:items-center">
          <button
            on:click={login}
            class="inline px-4 py-2 text-md font-medium leading-5 text-white uppercase transition-colors duration-150 bg-green-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-green active:bg-green-600 hover:bg-green-700">
            Start your journey
          </button>
        </div>
      </section>
    </div>
  {:else}
    <Task />
    You're awesome!

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

    <button
      on:click={logout}
      class="inline px-4 py-2 text-md font-medium leading-5 text-white uppercase transition-colors duration-150 bg-green-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-green active:bg-green-600 hover:bg-green-700">
      Log out</button>
  {/if}
</main>
