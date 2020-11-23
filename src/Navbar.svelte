<script>
  import Hamburger from "./Hamburger.svelte";
  export let sidebar = false;
</script>

<Hamburger bind:open={sidebar} />
