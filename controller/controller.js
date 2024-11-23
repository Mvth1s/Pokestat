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
        this.setupEventListeners();
    }

    updateView() {
        const pokemons = this.model.getPokemons();
        this.view.renderPokemons(pokemons);
    }

    setupEventListeners() {
        const typeSelector = document.getElementById("type-selector");
        typeSelector.addEventListener("change", (event) => {
            const selectedType = event.target.value;
            this.filterPokemonsByType(selectedType);
        });
    }

    filterPokemonsByType(type) {
        const pokemons = this.model.getPokemons();
        if (type === "all") {
            this.view.renderPokemons(pokemons);
        } else {
            const filteredPokemons = pokemons.filter(pokemon => {
                return pokemon.typeName1 === type || pokemon.typeName2 === type;
            });
            this.view.renderPokemons(filteredPokemons);
        }
    }
}
