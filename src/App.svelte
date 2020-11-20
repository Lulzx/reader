<script lang="ts">
  import TailwindCss from "./TailwindCSS.svelte";

  import { onMount } from "svelte";

  let count: number = 0;
  onMount(() => {
    const interval = setInterval(() => count++, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

time passed since eternity:
{count}
