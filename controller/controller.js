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
        this.setupEventListenersByType();
        this.setupEventListenersByGen();
    }

    updateView() {
        const pokemons = this.model.getPokemons();
        this.view.renderPokemons(pokemons);
    }

    setupEventListenersByType() {
        const typeSelector = document.getElementById("type-selector");
        const genSelector = document.getElementById("gen-selector");
        typeSelector.addEventListener("change", async (event) => {
            const selectedType = event.target.value;
            genSelector.value = "all";
            await this.filterPokemonsByType(selectedType);
        });
    }

    setupEventListenersByGen() {
        const genSelector = document.getElementById("gen-selector");
        const typeSelector = document.getElementById("type-selector");
        genSelector.addEventListener("change", async (event) => {
            const selectedGen = event.target.value;
            typeSelector.value = "all";
            await this.filterPokemonsByGen(selectedGen);
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

    async filterPokemonsByGen(gen) {
        if (gen === "all") {
            this.updateView();
        } else {
            let genMin = 0, genMax = 0;
            if(gen === "1") {genMin = 1; genMax = 151;}
            else if(gen === "2") {genMin = 152; genMax = 251;}
            else if(gen === "3") {genMin = 252; genMax = 386;}
            else if(gen === "4") {genMin = 387; genMax = 493;}
            
            /*
            switch (gen) {
                case "1":
                    genMin = 1; 
                    genMax = 151;
                    break;
                case "2":
                    genMin = 152; 
                    genMax = 251;
                    break;
                case "3":
                    genMin = 252; 
                    genMax = 386;
                    break;
                case "4":
                    genMin = 387; 
                    genMax = 493;
                    break;
                default:
                    break;
            }*/

            await this.statModel.fetchPokemonsByGen(genMin, genMax);
            const filteredPokemons = this.statModel.getPokemons();
            this.view.renderPokemons(filteredPokemons);
        }
    }
}
