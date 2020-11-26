<script>
  import { createAuth } from "./auth";
  import { Route } from "tinro";
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
      <button on:click={() => login(config['audience'])}>Login</button>
    {:else}
      <button on:click={() => logout()}>Logout</button>
      <div>
        <div>
          <Route path="/">
            <h2>Home</h2>
            <p>This is the root page</p>
          </Route>
          <Route path="/test">
            <h2>Settings</h2>
            <p>This is the settings page</p>
          </Route>
          <Route fallback>
            <h2>404 Not Found</h2>
            <p>Sorry, page not found</p>
          </Route>
        </div>
      </div>
    {/if}
  </div>
</main>
