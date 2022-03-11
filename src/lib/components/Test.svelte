<script>
  import { fade } from 'svelte/transition'
  
  export let i, question, answerA, answerB, answerC, answerD, correct = ''

  let DOManswerA, DOManswerB, DOManswerC, DOManswerD;

  let checkAnswer = (answer, DOManswer) => {
    answer === correct ? DOManswer.classList.add('correct') : DOManswer.classList.add('wrong')
  }
</script>

<section class="test">
  {#key i}
    <div transition:fade>
      <h1><small>{++i}</small>{question}</h1>
      <p bind:this={DOManswerA} on:click={() => checkAnswer(answerA, DOManswerA)}>{answerA}</p>
      <p bind:this={DOManswerB} on:click={() => checkAnswer(answerB, DOManswerB)}>{answerB}</p>
      <p bind:this={DOManswerC} on:click={() => checkAnswer(answerC, DOManswerC)}>{answerC}</p>
      <p bind:this={DOManswerD} on:click={() => checkAnswer(answerD, DOManswerD)}>{answerD}</p>
      <a href="/">&larr;</a>
    </div>
  {/key}
</section>

<style>
  :global(.correct) {
    color: teal;
  }
  :global(.wrong) {
    color: crimson;
  }
  section {
    width: 100%;
    height: 100vh;
    padding: 20vw;
  }
    div {
      line-height: 5rem;
    }
    small, a {
      color: gray;
      font-weight: 200;
      padding-right: 2.5rem;
      font-size: 2.5rem;
    }
    h1 {
      font-size: 2.5rem;
    }
    p {
      cursor: pointer;
      font-size: 1.5rem;
      transition: .4s all;
    }
</style>