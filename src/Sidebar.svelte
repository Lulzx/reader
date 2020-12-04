<script lang="ts">
  import Navigation from "./Navigation.svelte";
  export let open: boolean = false;
</script>

<style>
  aside {
    left: -100%;
    transition: left 0.3s ease-in-out;
  }

  .open {
    left: 0;
  }
</style>

<aside class="absolute h-full bg-gray-200 border-r-2 shadow-lg p-10" class:open>
  <Navigation />
</aside>
