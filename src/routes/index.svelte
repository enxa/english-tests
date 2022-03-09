<script context="module">
	export const prerender = true

	// function load({ fetch, page, params, session, stuff })
	export const load = async e => {
    return {
      props: {
        jwt: e.session.auth 
      }
    }
  }
</script>

<script>
  import { session } from '$app/stores'

  export let jwt

  $: console.log(jwt)
  
  export const changeSession = (jwt) => {
    document.cookie = `jwt=${jwt};path=/`
    $session = { jwt }
  }
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
  <a href="/meanings-by-word"><h1>Meanings by Word</h1></a>
  <a href="/words-by-meaning"><h1>Words by Meaning</h1></a>
</section>

<style>
  section {
    width: 100%;
    height: 100vh;
    padding: 20vw;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    gap: 10vw;
  }
  h1 {
    font-size: 5rem;
    color: black;
  }
</style>