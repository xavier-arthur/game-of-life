<script>
    import Life from './life.js';
    import { row, column } from './stores.js';

    let grid = [];
    let gridCards = [];

    export let rows = 10;
    export let columns = 10;

    row.subscribe(v => rows = v);
    column.subscribe(v => columns = v);

    $: rows, buildGrid(); 
    $: columns, buildGrid();
        
    function buildGrid() {
        grid = [];
        gridCards = []

        if (rows == 0 || columns == 0)
            return;

        Array.from({ length: columns * rows }).forEach(() => gridCards.push([]));

        for (let i = 0; i < columns; i++) {
            let tmp = [];
            for (let k = 0; k < rows; k++)  {
                tmp.push(new Life(false));
            }
            grid = [...grid, tmp];
        }

        console.log(grid.length);
    }
    
    function toggleCell(i, k) {
        let copy = [...grid];
        copy[i][k].toggle();
        grid = copy;
    }

    function getNeighboringCells(i, k, array) {
        let neighbors = [
            // cells to the left
            [i - 1, k - 1],
            [i, k - 1],
            [i + 1, k - 1],

            // cells on top and bottom
            [i - 1, k],
            [i + 1, k],

            // cells on the right
            [i - 1, k + 1],
            [i, k + 1],
            [i + 1, k + 1]
        ]

        neighbors = neighbors.filter(v => v.every(k => k >= 0 && k < array.length));

        return neighbors;
    }

    export function advanceGameState() {
        let gridCopy = [...grid];

        let neighbors;
        let toGetAlive    = [];
        let toDie         = [];

        outer:
        for (let i = 0; i < gridCopy.length; i++) {
            for (let k = 0; k < gridCopy[i].length; k++) {

                neighbors = getNeighboringCells(i, k, gridCopy);
                let aliveNeighbors    = [];

                for (const [row, column] of neighbors) {
                    if (gridCopy[row][column].state)
                        aliveNeighbors.push([row, column]);
                }

                if (gridCopy[i][k].state) {
                    if (aliveNeighbors.length < 2 || aliveNeighbors.length > 3)
                        toDie.push([i, k]);

                } else {
                    // check if the dead cell has three alive neighbors, and 
                    // if so, make it alive

                    if (aliveNeighbors.length == 3) {
                        toGetAlive.push([i, k]);
                    }
                }
            }
        }
        toGetAlive.forEach(pair => gridCopy[pair[0]][pair[1]].setToAlive())
        toDie.forEach(pair => gridCopy[pair[0]][pair[1]].setToDead())
        grid = gridCopy;
    }

    buildGrid();
</script>

<main>
    {#if rows > 0 && columns > 0}
        {#each grid as cval, i}
            <div class="grid">
                {#each cval as kval, k}
                    <div 
                        class:is-off="{!kval}" 
                        class:is-on="{kval.state}" class="card" 
                        bind:this="{gridCards[i][k]}"
                        style="user-select: none;"
                        on:mouseup="{() => toggleCell(i, k)}"
                    >
                    <!-- {i+1}x{k+1} -->
                    <!-- {i}x{k} -->
                    </div>
                {/each}
            </div>
        {/each}
    {/if}
</main>