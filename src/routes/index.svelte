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