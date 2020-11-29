<script>
  import Visibility from "./Visibility.svelte";
  let value: string;
  let show = true;

  function reload() {
    show = false;
    setTimeout(() => (show = true), 100);
  }
  function process(query: string) {
    return query;
  }
</script>

<style>
  main {
    text-align: center;
  }

  h1 {
    letter-spacing: 0.1rem;
    margin-bottom: 100vh;
  }

  h2 {
    padding-bottom: 10rem;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10rem;
    padding: 1rem;
    position: relative;
    box-shadow: 0 0 10px -5px black;
    height: 300px;
  }

  img {
    height: 300px;
    width: 300px;
  }

  .top-left,
  .top-right,
  .bottom-left,
  .bottom-right {
    position: absolute;
    background: yellow;
    padding: 0.5rem;
    font-size: 0.8rem;
    font-weight: 700;
  }

  .top-left {
    top: 0;
    left: 0;
  }

  .top-right {
    top: 0;
    right: 0;
  }

  .bottom-left {
    bottom: 0;
    left: 0;
  }

  .bottom-right {
    bottom: 0;
    right: 0;
  }
</style>

<main class="bg-gray-100">
  <div class="w-full bg-gray-100 shadow-xl" id="search-content">
    <div class="container mx-auto py-4 text-black">
      <input
        type="text"
        placeholder="type your query here..."
        bind:value
        class="w-full text-grey-800 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl" />
    </div>
  </div>

  <div class="grid grid-cols-3 gap-4">
    <div
      class="bg-gray-300 text-black font-bold rounded-lg border shadow-lg p-10">
      my notes for
      {value}
    </div>
    <div
      class="bg-gray-300 text-black font-bold rounded-lg border shadow-lg p-10">
      {process(value)}
    </div>
    <div
      class="bg-gray-300 text-black font-bold rounded-lg border shadow-lg p-10">
      info found on internet for
      {value}
    </div>
  </div>
  <div>
    {#each [...Array(1).keys()] as k}
      <div id="div{k}" class="border">div{k} div content</div>
    {/each}
  </div>

  <button on:click={reload} class="rounded-lg bg-gray-200">Reload</button>
  <h1>Scroll down</h1>
  <h2>Work in Progress</h2>
  {#if show}
    <Visibility
      steps={100}
      let:percent
      let:unobserve
      let:intersectionObserverSupport>
      {#if !intersectionObserverSupport}
        <h2>No IntersectionObserver support? 😢</h2>
      {:else}
        <section>
          <span class="top-left">{percent}%</span>
          <span class="top-right">{percent}%</span>
          <span class="bottom-left">{percent}%</span>
          <span class="bottom-right">{percent}%</span>

          {#if percent > 70}
            <img
              alt="Robot"
              use:unobserve
              src="https://robohash.org/svelte-is-awesome.png" />
          {/if}
        </section>
      {/if}
    </Visibility>
  {/if}
</main>
