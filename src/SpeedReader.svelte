<script lang="ts">
  import { onMount } from "svelte";
  let wpm = 300;
  let interval = 60000 / wpm;
  let paused = false;
  let status = "pause";
  let i = 1;
  let words: string[] = [];
  let spritz: number;
  let keyCode;
  let previous: string, middle: string, end: string;
  let text = `this is some random text which you shouldn't be looking at just go outside and see the sunshine okay life is beautiful you should enjoy is to the fullest there is something wrong why are you still here when I told you already to not pay attention here in this speed reader`;
  function words_set() {
    words = text
      .trim()
      .replace(/([-—])(\w)/g, "$1 $2")
      .replace(/[\r\n]/g, " {linebreak} ")
      .replace(/\. /g, ". {period} ")
      .replace(/[ \t]{2,}/g, " ")
      .split(" ");
    for (let j = 1; j < words.length; j++) {
      words[j] = words[j].replace(/{linebreak}|{period}/g, "   ");
    }
  }
  function word_show(i: number) {
    let word = words[i];
    let stop = Math.round((word.length + 1) * 0.4) - 1;
    previous = word.slice(0, stop);
    middle = word[stop];
    end = word.slice(stop + 1);
  }
  function word_update() {
    spritz = setInterval(() => {
      word_show(i);
      i++;
      if (i == words.length) {
        setTimeout(() => {
          words_set();
          i = 0;
          spritz_pause();
        }, interval);
        window.clearInterval(spritz);
      }
    }, interval);
  }
  function spritz_pause() {
    window.clearInterval(spritz);
    paused = true;
    status = "paused";
  }
  function spritz_play() {
    word_update();
    paused = false;
    status = "";
  }
  function spritz_flip() {
    if (paused) {
      spritz_play();
    } else {
      spritz_pause();
    }
  }
  function init() {
    words_set();
    word_show(0);
    word_update();
  }
  function change_speed(change: number) {
    wpm += change;
    interval = 60000 / wpm;
    if (!paused) {
      words_set();
      i = 0;
      spritz_pause();
      window.clearInterval(spritz);
      word_update();
    }
  }
  function refresh() {
    window.clearInterval(spritz);
    words_set();
    i = 0;
    spritz_play();
  }
  function pause() {
    spritz_flip();
    return false;
  }
  function keyup(event: any) {
    keyCode = event.keyCode;
    if (keyCode == 32) {
      spritz_flip();
    }
  }
  onMount(async () => {
    init();
  });
</script>

<style>
  .spritz {
    position: relative;
    padding: 1rem 0 1.2rem;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
  }
  .spritz:after,
  .spritz:before {
    content: "";
    position: absolute;
    left: 40%;
    height: 0.8rem;
    width: 2px;
    margin-left: -1px;
    background-color: #000;
  }
  .spritz:before {
    top: 0;
  }
  .spritz:after {
    bottom: 0;
  }
  .spritz-word {
    font-size: 2.4rem;
    line-height: 3.2rem;
    height: 3.2rem;
    font-weight: 600;
  }
  .spritz-word div {
    display: table-cell;
  }
  .spritz-word div:first-child {
    width: 40%;
    text-align: right;
  }
  .spritz-word div:nth-child(2) {
    color: #e60000;
  }
  .spritz-word div:last-child {
    width: 60%;
    text-align: left;
  }
</style>

<svelte:window on:keydown={keyup} />
<main class="flex-grow flex justify-center items-center">
  <div class="grid gap-4 items-start mt-8 mx-auto px-8">
    <div class="col-span-2">
      <div class="bg-white shadow-lg rounded-lg px-4 py-6 mx-4 my-4">
        <div class="mx-auto h-auto bg-gray-200 rounded-md">
          <div class="spritz">
            <div class="spritz-word">
              <div>{previous}</div>
              <div>{middle}</div>
              <div>{end}</div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <div
            on:click={pause}
            class="flex justify-center rounded-sm h-8 w-20 px-4 bg-gray-200 mr-2 transform hover:scale-95 transition duration-300 cursor-pointer">
            <button
              class="{status} focus:outline-none"
              id="spritz_pause"
              href="#!"
              title="Pause/Play">{#if paused}▶️{:else}⏸{/if}</button>
          </div>
          <div
            class="flex justify-center rounded-sm h-8 w-20 px-4 bg-green-300 transform hover:scale-95 transition duration-300 cursor-pointer"
            on:click={refresh}>
            <button
              class="refresh focus:outline-none"
              id="spritz_change">🔄</button>
          </div>
        </div>
        <div class="flex justify-center mt-2">
          <div
            class="flex justify-center rounded-sm h-8 w-20 px-4 mr-2 bg-red-300 transform hover:scale-95 transition duration-300 cursor-pointer"
            on:click={() => {
              pause();
              change_speed(-50);
              pause();
            }}>
            <button
              class="refresh focus:outline-none"
              id="spritz_change">🐌</button>
          </div>
          <div
            class="flex justify-center rounded-sm h-8 w-20 px-4 bg-blue-300 transform hover:scale-95 transition duration-300 cursor-pointer"
            on:click={() => {
              pause();
              change_speed(50);
              pause();
            }}>
            <button
              class="refresh focus:outline-none"
              id="spritz_change">🚀</button>
          </div>
        </div>
        <div class="bg-gray-200 w-64 mt-2 block mx-auto rounded-sm">
          <input
            type="text"
            class="bg-gray-200 focus:outline-none"
            bind:value={text} />
        </div>
      </div>
    </div>
  </div>
</main>
