<script>
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import Test from '$lib/components/Test.svelte'

  let loading = false
  let query = new URLSearchParams()
  let resultArray = []
  let resultStore = writable([])
  let skip = 0
  let limit = 10
  
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

    let resource = `./meanings-by-word?${query.toString()}`
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
  <Test {...$resultStore[i]} />
{/if}



<!-- <section>
  {#each $resultStore as res}
    <div class="test">
      <div>{res.question}</div>
      <div>A: {res.answerA}</div>
      <div>B: {res.answerB}</div>
      <div>C: {res.answerC}</div>
      <div>D: {res.answerD}</div>
    </div>
  {/each}
  {#if loading}
    <div style="height: 50vh;">Loading...</div>
  {/if}
</section>

<style>
  .test {
    height: 100vh;
    border: 1px solid red;
  }
</style> -->

