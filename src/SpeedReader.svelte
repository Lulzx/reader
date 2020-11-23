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
  function change_speed() {
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
  @charset "UTF-8";
  .spritz {
    position: relative;
    width: 30rem;
    padding: 1rem 0 1.2rem;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    margin: auto;
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
  .settings {
    margin: 0 auto;
    max-width: 30rem;
  }
  .settings button,
  .settings input,
  .settings .textarea {
    box-sizing: border-box;
    border: 0;
    color: #000;
    padding: 1rem 1.5rem;
  }
  .settings button:focus,
  .settings input:focus {
    outline: 0;
  }
  .settings .interaction {
    margin: 2rem 0;
  }
  .settings .speed {
    position: relative;
    display: block;
    float: right;
    height: 4rem;
    width: 18rem;
    font-weight: 600;
  }
  .settings .refresh {
    margin: 1rem auto;
    display: block;
    cursor: pointer;
  }
  .settings .refresh:active {
    padding: 1.1rem 1.5rem 0.9rem;
  }
  .settings .textarea {
    width: 100%;
    height: 5em;
    margin: 5rem 0 0;
  }
  .settings .textarea::-webkit-scrollbar {
    width: 0.8rem;
  }
  .settings .textarea::-webkit-scrollbar-thumb {
    background: #ccc;
  }
</style>

<div class="p-12">
  <div class="spritz">
    <div class="spritz-word">
      <div>{previous}</div>
      <div>{middle}</div>
      <div>{end}</div>
    </div>
  </div>
  <div class="settings">
    <div class="interaction">
      <button
        class={status}
        id="spritz_pause"
        href="#"
        title="Pause/Play"
        on:click={pause}>{#if paused}▶️{:else}⏸{/if}</button>
      <input
        class="speed"
        id="spritz_wpm"
        type="number"
        bind:value={wpm}
        on:input={change_speed}
        step="50"
        min="50" />
    </div>
    <input type="text" class="textarea" bind:value={text} />
    <button
      class="refresh"
      id="spritz_change"
      on:click={refresh}>Refresh</button>
  </div>
</div>
<svelte:window on:keydown={keyup} />
