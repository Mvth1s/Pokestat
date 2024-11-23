// controller.js
class PokemonController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    async init() {
        await this.model.fetchPokemons();
        this.updateView();
    }

    updateView() {
        const pokemons = this.model.getPokemons();
        this.view.renderPokemons(pokemons);
    }
}
