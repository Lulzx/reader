<script lang="ts">
  import Hamburger from "./Hamburger.svelte";
  export let sidebar: boolean = false;
</script>

<Hamburger bind:open={sidebar} />
