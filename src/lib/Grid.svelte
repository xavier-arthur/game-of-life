<script>
    import Life from './life.js';

    let grid = [];
    let gridCards = [];

    export let size = 10;

    Array.from({ length: size }).forEach(() => gridCards.push([]));

    for (let i = 0; i < size; i++) {
        let tmp = [];
        for (let k = 0; k < size; k++) 
            tmp.push(new Life(false));
        grid = [...grid, tmp];
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

    function advanceGameState() {
        let gridCopy = [...grid];
        let gridCopyIteration = [...grid]

        let neighbors;
        outer:
        for (let i = 0; i < gridCopyIteration.length; i++) {
            for (let k = 0; k < gridCopyIteration[i].length; k++) {
                if (!gridCopyIteration[i][k].state)
                    continue;

                neighbors = getNeighboringCells(i, k, gridCopyIteration);

                for (const [row, column] of neighbors) {
                    console.log(row, column);
                    gridCopy[row][column].toggle();
                }
                break outer;
            }
        }
        grid = gridCopy;
    }
</script>

<main>
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
                {i}x{k}
                </div>
            {/each}
        </div>
    {/each}

    <button on:mouseup={() => advanceGameState()} type="button">advance</button>
</main>