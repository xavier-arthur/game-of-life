<script>
    import Grid from './lib/Grid.svelte'
</script>


<main>
    <span class="is-center"><h2>Conway's game of life</h2></span>

    <Grid size={9} />

    <!-- <span class="is-center"> <button type="button">advance</button> </span> -->
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
</style>
