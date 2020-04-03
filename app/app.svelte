<script>
  let who = "World";

  function svelte() {
    who = "svelte";
  }
</script>

<div>
  Hello, {who}!
  <button on:click={svelte}>Click it</button>
</div>
