<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { fly } from 'svelte/transition'
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
  <section>
    {#key $resultStore[i]}
      <span style="display: inline-block; position: absolute; top: 40%; padding: 0 20vw" in:fly={{ y: -20, delay: 200 }} out:fly={{ y: 20}}>
        <Test {...$resultStore[i]} {i}/>
      </span>
    {/key}
  </section>
{/if}

<style>
  section {
    width: 100%;
    height: 100vh;
  }
</style>