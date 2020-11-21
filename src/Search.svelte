<script lang="ts">
  import { onMount } from "svelte";

  let page: any = 0;
  let pages: number = 1;
  let rows: any[] = [];
  let total: number;
  let type: string = "title";
  let state: string = "onload";
  let types: string[] = ["title", "author", "publisher", "year"];
  //   let headers: string[] = [...types, "size", "extension"];
  let previous_page: number = 0;
  let current_query: string = "";
  let previous_query: string = "";

  async function retrieve<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
  }

  interface info {
    results: [];
    count: string;
  }
  const search = async () => {
    if (!current_query) {
      return;
    }
    state = "loading";
    let current_page = page + 1;
    if (!page) {
      current_page = 1;
    }
    if (previous_page === current_page && previous_query === current_query) {
      state = "completed";
      return;
    }
    if (previous_query !== current_query) {
      current_page = 1;
      page = 0;
    }
    let base_url: string = "https://lulzx.herokuapp.com/query/";
    let url: string =
      base_url + type + "/" + current_query + "/" + current_page;
    const data = await retrieve<info[]>(url);
    rows = data["results"];
    total = data["count"];
    if (total <= 25) {
      pages = 1;
    } else {
      pages = ~~(total / 25);
    }
    let nextState = "?" + type + "=" + current_query;
    window.history.replaceState("", "", nextState);
    previous_page = current_page;
    previous_query = current_query;
    state = "completed";
  };
  onMount(async () => {
    if (typeof window != "undefined") {
      let location = new URL(window.location.href);
      if (location.search !== "" && current_query !== "") {
        let current_type: string = "";
        state = "loading";
        for (let x of types) {
          if (location.searchParams.has(x)) {
            current_type = x;
            type = current_type;
            break;
          }
        }
        let text = location.searchParams.get(current_type);
        if (text !== null) {
          current_query = text;
          await search();
        }
      }
      let url = "https://lulzx.herokuapp.com/";
      await fetch(url)
        .then(() => {
          console.log("feels good man!");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
</script>

{#if ['onload', 'completed'].includes(state)}
  {#if state === 'onload'}
    <!-- <h1 data-shadow="Shoten">Shoten</h1> -->
    welcome!
  {/if}
  <form on:submit={search}>
    <div>
      <input
        class="rounded-lg pl-10 pr-4 py-2 md:mb-0 mb-1 w-full"
        type="text"
        bind:value={current_query}
        placeholder="type book {type}..." />
    </div>
  </form>
  <!-- svelte-ignore missing-declaration -->
  <legend>Filter (fields)</legend>
  {#each types as k}
    <input
      type="radio"
      on:mouseleave={() => {}}
      on:click={() => {
        type = k;
      }} />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>{k}</label>
  {/each}

  <!-- {#if state === 'completed'}
    <DataTable
      sortable
      zebra
      on:click:row={({ detail }) => {
        let str = detail['download'],
          hash = str.split('main/')[1],
          book_url = window.location.origin + '/book?id=' + hash;
        window.open(book_url, '_blank');
      }}
      title="Search Results"
      description="A total of {total} results were found for your query."
      headers={headers.map((x) => ({ key: x, value: x }))}
      {rows} />
    <PaginationNav
      bind:page
      on:change={search}
      total={pages}
      on:click:button--previous={page}
      on:click:button--next={page} />
  {/if} -->
  {#if state === 'completed'}
    total:
    {total}
    <hr />
    {#each rows as row}- {row['title']}<br />{/each}
  {/if}
{:else if state === 'loading'}
  <!-- <div id="search" /> -->
  loading.. please wait..
{/if}
