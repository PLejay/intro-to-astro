<script>
  import { storedCalculations } from "../../calculatorStore";
</script>

<div class="calculation-display">
  <header>
    <h2>History</h2>
  </header>
  <ul>
    {#each $storedCalculations as calculation, calcIndex}
      <li>
        <p>
          {calculation.firstNumber}
          {calculation.operator}
          {calculation.secondNumber} =
          <strong>
            {calculation.result}
          </strong>
        </p>
        <button
          class="remove-calculation"
          on:click={() =>
            storedCalculations.set(
              $storedCalculations.filter((_, i) => i !== calcIndex),
            )}
          aria-label="remove"
        >
          <i class="ri-delete-bin-line ri-xs"></i>
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .calculation-display {
    min-width: 40ch;
    height: 100%;
    background-color: var(--blue-800);
    border-radius: 8px;
    color: var(--text-colour);
  }

  header {
    background-color: var(--blue-800);
    padding-inline: 2rem;
    padding-block: 1rem;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 1px 0 rgba(255, 60, 199, 0.9);
  }

  h2 {
    font-size: var(--text-xl);
  }

  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }

  li {
    padding-inline: 2rem;
    padding-block: 0.5rem;
    border-bottom: 1px solid var(--blue-500);
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .remove-calculation {
    background-color: transparent;
    border: none;
    color: var(--red-500);
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      color: var(--accent-colour);
      opacity: 1;
    }

    &:active {
      color: var(--accent-dark);
      opacity: 1;
    }
  }
</style>
