<script lang="ts">
  import { onMount } from "svelte";

  let loading = true;

  let title: string,
    subtitle: string,
    description: string,
    author: string,
    year: string,
    src: string,
    download: string;

  async function retrieve<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(request);
    return await response.json();
  }

  interface book {
    title: string;
    subtitle: string;
    description: string;
    year: string;
    author: string;
    image: string;
    direct_url: string;
  }

  onMount(async () => {
    let hash = new URL(window.location.href).searchParams.get("id");
    if (hash === null) {
      return;
    }
    let base_url = "https://lulzx.herokuapp.com/book/";
    let url = base_url + hash;
    const data = await retrieve<book[]>(url);
    title = data["title"];
    subtitle = data["subtitle"];
    description = data["description"];
    author = data["author"];
    year = data["year"];
    src = data["image"];
    if (src === "NO_IMAGE") {
      src = "https://picsum.photos/312/500";
    }
    download = data["direct_url"];
    loading = false;
  });
  function description_handler() {
    let remaining_chars = 500;
    let accordion_text = "";
    let description_list = description.split(".");
    for (let i of description_list) {
      if (i.length < remaining_chars) {
        accordion_text += i + ".";
        remaining_chars -= i.length;
      }
    }
    return accordion_text;
  }
</script>

{#if loading}
  loading...
{:else}
  <section class="text-gray-700 body-font">
    <div class="container mx-auto px-4 py-6 sm:px-0">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img alt="cover" class="object-cover object-center" {src} />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">
            {subtitle}
          </h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            {title}
          </h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              By
              <span class="text-blue-500 ml-1">
                <a href={'https://shoten.vercel.app/?author=' + author}>
                  {author}
                </a>
              </span>
            </span>
            <span
              class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">{year}</span>
          </div>
          <p class="leading-relaxed" style="text-align:justify">
            {description_handler()}
          </p>
          <div
            class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div class="flex ml-6 items-center">
              <div class="relative">
                <span
                  class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center" />
              </div>
            </div>
          </div>
          <div class="flex">
            {#if download.endsWith('.epub')}
              <a href={'/read?url=' + download} class="flex ml-auto"><button
                  class="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Read</button></a>
            {/if}
            <a href={download} class="flex ml-2"><button
                class="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Download</button></a>
          </div>
        </div>
      </div>
    </div>
  </section>
{/if}
