<script lang="ts">
  import ePub from "epubjs";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  let open = false;
  let highlights: string[] = [];
  let book = ePub("https://s3.amazonaws.com/moby-dick/OPS/package.opf");
  let rendition = book.renderTo("viewer", {
    width: "100%",
    height: 600,
    ignoreClass: "annotator-hl",
    manager: "continuous",
  });
  onMount(async () => {
    rendition.display(10);

    book.loaded.navigation.then(function (toc) {
      console.log(toc);
    });

    rendition.on("relocated", function (location: any) {
      console.log(location);
    });

    rendition.on(
      "selected",
      function (
        cfiRange: string,
        contents: {
          window: {
            getSelection: () => {
              (): any;
              new (): any;
              removeAllRanges: { (): void; new (): any };
            };
          };
        }
      ) {
        rendition.annotations.highlight(cfiRange, {}, (e: { target: any }) => {
          console.log("highlight clicked", e.target);
        });
        contents.window.getSelection().removeAllRanges();
      }
    );

    rendition.themes.default({
      "::selection": {
        background: "rgba(255,255,0, 0.3)",
      },
      ".epubjs-hl": {
        fill: "yellow",
        "fill-opacity": "0.3",
        "mix-blend-mode": "multiply",
      },
    });

    rendition.on("selected", async function (cfiRange: string) {
      let range: Range = await book.getRange(cfiRange);
      let text;
      if (range) {
        text = range.toString();
        highlights.push("➡️ " + text);
      }
    });
  });
  function key_handler(event: any) {
    if (event.code == 32) {
      open = !open;
    }
    if (event.code == 37) {
      rendition.prev();
    }
    if (event.code == 39) {
      rendition.next();
    }
  }
</script>

<style type="text/css">
  #viewer.spreads {
    width: 900px;
    height: 600px;
    box-shadow: 0 0 4px #ccc;
    border-radius: 5px;
    padding: 0;
    position: relative;
    margin: 10px auto;
    background: white url("ajax-loader.gif") center center no-repeat;
    top: calc(50vh - 400px);
  }

  #prev {
    left: 0;
  }

  #next {
    right: 0;
  }

  @media (min-width: 1000px) {
    #viewer.spreads:after {
      position: absolute;
      width: 1px;
      border-right: 1px #000 solid;
      height: 90%;
      z-index: 1;
      left: 50%;
      margin-left: -1px;
      top: 5%;
      opacity: 0.15;
      box-shadow: -2px 0 15px rgba(0, 0, 0, 1);
      content: "";
    }

    #prev {
      left: 40px;
    }

    #next {
      right: 40px;
    }
  }

  .arrow {
    position: fixed;
    top: 50%;
    margin-top: -32px;
    font-size: 64px;
    color: #e2e2e2;
    font-family: arial, sans-serif;
    font-weight: bold;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    text-decoration: none;
  }

  .arrow:hover {
    color: #777;
  }

  .arrow:active {
    color: #000;
  }

  ::selection {
    background: yellow;
  }

  #viewer.spreads {
    top: 0;
    margin-top: 50px;
  }
</style>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js">
  </script>
  <script src="https://cdn.jsdelivr.net/npm/jszip/dist/jszip.min.js">
  </script>
</svelte:head>

<div class="flex">
  <div class="flex-initial -mt-4">
    <div id="frame">
      <div id="viewer" class="spreads" />
      <a
        id="prev"
        href="#prev"
        class="arrow"
        on:click={() => {
          rendition.prev();
        }}>‹</a>
      <a
        id="next"
        href="#next"
        class="arrow"
        on:click={() => {
          rendition.next();
        }}>›</a>
    </div>
  </div>
</div>
{#if open}
  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div
        on:click={() => setTimeout(() => (open = false), 50)}
        class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        out:fade
        aria-hidden="true" />
      <section
        class="absolute inset-y-0 right-0 pl-10 max-w-full flex"
        aria-labelledby="slide-over-heading"
        transition:fly={{ x: 500, duration: 500 }}>
        <div class="relative w-screen max-w-md">
          <div
            class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
            <button
              on:click={() => setTimeout(() => (open = false), 50)}
              class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span class="sr-only">Close panel</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div
            class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
            <div class="px-4 sm:px-6">
              <h2
                id="slide-over-heading"
                class="text-lg font-medium text-gray-900">
                Your highlights
              </h2>
            </div>
            <div class="mt-6 relative flex-1 px-4 sm:px-6">
              <div class="absolute inset-0 px-4 sm:px-6">
                <div class="h-full" aria-hidden="true">
                  {#if highlights.length > 0}
                    <ul>
                      {#each highlights as highlight}
                        <li>{highlight}</li>
                      {/each}
                    </ul>
                  {:else}wow, isn't it so nice?{/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
{/if}
<svelte:window on:keydown={key_handler} />
