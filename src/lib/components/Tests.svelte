<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import Test from '$lib/components/Test.svelte'

  export let url

  let loading = false
  let query = new URLSearchParams()
  let resultArray = []
  let resultStore = writable([])
  let skip = 0
  let limit = 100
  
  let loadMore = async (skip) => {
    loading = true
    // let skip = Number(e.detail.skip)
    query.set('limit', String(limit))
    query.set('skip', String(skip * limit))
    
    let responseObject = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    let resource = `${url}?${query.toString()}`
    let response = await fetch(resource, responseObject)
    let result = await response.json()

    if (result) loading = false
    resultArray = [...resultArray, ...result]
    resultStore.set(resultArray)
  }

  let handleScroll = e => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) loadMore(skip++)
  }

  let i = 0
  let handleWheel = e => {
    if (e.deltaY > 0) ++i <= 0 ? i = 0 : i
    else if (e.deltaY < 0) --i <= 0 ? i = 0 : i
    loadMore(skip++)
  }

  onMount(() => loadMore(0))
</script>

<svelte:window on:wheel={handleWheel}/>

{#if $resultStore[i]}
  <section class="tests">
    {#key $resultStore[i]}
      <div transition:fade>
        <Test {...$resultStore[i]} {i}/>
      </div>
    {/key}
  </section>
{/if}