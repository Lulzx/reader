<script>
  import { createAuth } from "./auth";
  const config = {
    domain: "shoten.us.auth0.com",
    client_id: "MG2ggKq3jrR0xZyzqLb2n9ScFQXD1kDX",
    audience: "https://shoten.us.auth0.com/api/v2/",
  };
  const { isLoading, isAuthenticated, login, logout, authError } = createAuth(
    config
  );
  $: disabled = !$isAuthenticated;
</script>

<main>
  <div>
    {#if $isLoading}
      <p>Loading ...</p>
    {:else if $authError}
      <p>Authentication error</p>
    {:else if !$isAuthenticated}
      <button
        on:click={() => login('https://reader.vercel.app/auth')}>Login</button>
    {:else}
      <button on:click={() => logout()}>Logout</button>
      <div>Authentication successful!</div>
    {/if}
  </div>
</main>
