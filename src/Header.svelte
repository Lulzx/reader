<script lang="ts">
  import { Route } from "tinro";
  import Home from "./Home.svelte";
  import Audiobook from "./Audiobook.svelte";
  import Book from "./Book.svelte";
  import Bookshelf from "./Bookshelf.svelte";
  import Dashboard from "./Dashboard.svelte";
  import Note from "./Note.svelte";
  import Test from "./Test.svelte";
  import SpeedReader from "./SpeedReader.svelte";
  import Auth from "./Authentication.svelte";
</script>

<Route path="/">
  <Home />
</Route>
<Route path="/dashboard">
  <Dashboard />
</Route>
<Route path="/test">
  <Test />
</Route>
<Route path="/bookshelf">
  <Bookshelf />
</Route>
<Route path="/note">
  <Note />
</Route>
<Route path="/audiobook">
  <Audiobook />
</Route>
<Route path="/book">
  <Book />
</Route>
<Route path="/speed">
  <SpeedReader />
</Route>
<Route path="/auth">
  <Auth />
</Route>
