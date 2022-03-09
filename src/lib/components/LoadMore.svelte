<script>
	import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher()

  let i = 0

  let handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      dispatch('load-more', { skip: i++ })
    }
  }
</script>

<svelte:window on:scroll={handleScroll}/>

<slot></slot>