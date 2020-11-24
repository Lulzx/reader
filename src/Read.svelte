<script lang="ts">
  import ePub from "epubjs";
  import { onMount } from "svelte";
  let array_hightlights: string = "";
  let book = ePub("https://s3.amazonaws.com/moby-dick/OPS/package.opf");

  onMount(async () => {});
  let rendition = book.renderTo("viewer", {
    width: "100%",
    height: 600,
    ignoreClass: "annotator-hl",
    manager: "continuous",
  });

  let displayed = rendition.display(10);
  // Navigation loaded
  // book.loaded.navigation.then(function (toc) {
  //   console.log(toc);
  // });

  function key_handler(e: any) {
    if ((e.keyCode || e.which) == 37) {
      rendition.prev();
    }
    if ((e.keyCode || e.which) == 39) {
      rendition.next();
    }
  }

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

  let highlights = document.getElementById("highlights");

  rendition.on("selected", function (cfiRange: string) {
    book.getRange(cfiRange).then(function (range: { toString: () => any }) {
      let text;
      if (range) {
        text = range.toString();
        array_hightlights += text;
        // TODO highlights in right sidebar with toc
        // textNode = document.createTextNode(text);
        // a.textContent = cfiRange;
        // a.href = "#" + cfiRange;
        // a.onclick = function () {
        //   rendition.display(cfiRange);
        // };

        // remove.textContent = "remove";
        // remove.href = "#" + cfiRange;
        // remove.onclick = function () {
        //   rendition.annotations.remove(cfiRange);
        //   return false;
        // };

        // li.appendChild(a);
        // li.appendChild(textNode);
        // li.appendChild(remove);
        // highlights.appendChild(li);
      }
    });
  });
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
<svelte:window on:keydown={key_handler} />

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
  <div class="flex-initial">
    <div>{array_hightlights}</div>
  </div>
</div>
