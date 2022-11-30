export default class Life {

    #state

    /**
     * @param {boolean} state
    **/
    constructor(state) {
        this.#state = state
    }

    get state() {
        return this.#state;
    }

    setToAlive() {
        this.#state = true;
    }

    setToDead () {
        this.#state = false;
    }

    toggle () {
        this.#state = !this.#state;
    }
}