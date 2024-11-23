class PokemonController {
    constructor(model, statModel, view) {
        this.model = model;
        this.statModel = statModel;
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
        typeSelector.addEventListener("change", async (event) => {
            const selectedType = event.target.value;
            await this.filterPokemonsByType(selectedType);
        });
    }

    async filterPokemonsByType(type) {
        if (type === "all") {
            this.updateView();
        } else {
            await this.statModel.fetchPokemonsByType(type);
            const filteredPokemons = this.statModel.getPokemons();
            this.view.renderPokemons(filteredPokemons);
        }
    }
}
