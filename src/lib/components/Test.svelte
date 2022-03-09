<script>
  export let i, question, answerA, answerB, answerC, answerD, correct = ''

  let DOManswerA, DOManswerB, DOManswerC, DOManswerD;

  let checkAnswer = (answer, DOManswer) => {
    answer === correct ? DOManswer.classList.add('correct') : DOManswer.classList.add('wrong')
  }
</script>

<div>
  <h1><small>{++i}</small>{question}</h1>
  <p bind:this={DOManswerA} on:click={() => checkAnswer(answerA, DOManswerA)}>{answerA}</p>
  <p bind:this={DOManswerB} on:click={() => checkAnswer(answerB, DOManswerB)}>{answerB}</p>
  <p bind:this={DOManswerC} on:click={() => checkAnswer(answerC, DOManswerC)}>{answerC}</p>
  <p bind:this={DOManswerD} on:click={() => checkAnswer(answerD, DOManswerD)}>{answerD}</p>
  <br>
  <a href="/">&lt;</a>
</div>

<style>
  :global(.correct) {
    color: teal;
  }
  :global(.wrong) {
    color: crimson;
  }
  div {
    line-height: 5rem;
  }
  small {
    font-weight: 200;
    padding-right: 2.5rem;
  }
  h1 {
    font-size: 2.5rem;
  }
  p {
    cursor: pointer;
    font-size: 1.5rem;
  }
  a {
    color: gray;
    font-weight: 200;
    font-size: 5rem;
  }
</style>