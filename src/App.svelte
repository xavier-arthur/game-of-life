<script>
    import Grid from './lib/Grid.svelte'
    import { row, column } from './lib/stores.js';
    
    let advanceGameState;

    let interval;
    let stepInteval = e => {
        clearInterval(interval);

        if (e.target.value == "0" || e.target.value == "")
            return;

        interval = setInterval(() => { 
            stepButton.click();
        }, parseInt(`${e.target.value}`))
    };

    let stepButton;
</script>


<main>
    <span> 
        <input on:change={stepInteval} type="number" placeholder="interval (ms)">
        <input bind:value="{$column}" type="number" placeholder="columns">
        <input bind:value="{$row}" type="number" placeholder="rows">

        <h2 class="is-center">Conway's game of life</h2>
    </span>


    <div class="grid-container">
        <Grid bind:advanceGameState={advanceGameState}  />
    </div>

    <span class="is-center"> <button bind:this="{stepButton}" on:click="{advanceGameState}" type="button">advance</button> </span>

</main>

<style>
    main {
        margin: 1em;
    }

    .is-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    span {
        margin: 3em;
    }

    .grid-container {
        margin-right: 10em;
        margin-left: 10em;
    }
</style>
