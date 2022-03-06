<script>
  let email = 'e@g.com'
  let password = 'vcx'
  let result = null

  let handleSignUp = async e => {
    let data = { email, password }

    let response = await fetch(`./auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    })
    result = await response.json()
  }

  let handleSignIn = async e => {
    let data = { email, password }

    let response = await fetch(`./auth`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    })
    result = await response.json()
  }

  let handleSignOut = async e => {
    let data = { email, password }

    let response = await fetch(`./auth`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    })
    result = await response.json()
  }
</script>

<h1>Sign up</h1>
<form on:submit|preventDefault={handleSignUp}>
  <input type="email" bind:value={email}>{email}<br>
  <input type="password" bind:value={password}>{password}<br>
  <input type="submit" value="Sign up">
</form>

<h1>Sign in</h1>
<form on:submit|preventDefault={handleSignIn}>
  <input type="email" bind:value={email}>{email}<br>
  <input type="password" bind:value={password}>{password}<br>
  <input type="submit" value="Sign in">
</form>

<h1>Sign out</h1>
<form on:submit|preventDefault={handleSignOut}>
  <input type="submit" value="Sign out">
</form> -->

{#if result}
  {result.auth}
{/if}