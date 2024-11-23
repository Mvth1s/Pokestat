// views/views.js
class PokemonView {
    constructor() {
        this.pokemonContainer = document.getElementById("cards-container");
    }

    renderPokemons(pokemons) {
        this.pokemonContainer.innerHTML = ''; // Clear previous content
        const seenPokemon = new Set();
        pokemons.forEach(result => {
            if (!seenPokemon.has(result.pokemon)) {
                seenPokemon.add(result.pokemon);
                const pokemonCard = document.createElement("div");
                pokemonCard.className = "pokemon-card";
                pokemonCard.innerHTML = `
                    <h1><a href="${result.pokemon}">${result.name}</a></h1>
                    <p>N° Pokédex : ${result.number}</p>
                    <img src="${result.image}" alt="${result.name}">
                    <div class="pokemon-types">
                        <strong>Types:</strong> ${result.typeName1 ? result.typeName1 : ''}${result.typeName2 ? ', ' + result.typeName2 : ''}
                    </div>
                    <h2>Attributs:</h2>
                    <ul class="stats">
                        <li>PV: ${result.health}</li>
                        <li>Attaque: ${result.attack}</li>
                        <li>Défense: ${result.defense}</li>
                        <li>Vitesse: ${result.speed}</li>
                    </ul>
                `;
                this.pokemonContainer.appendChild(pokemonCard);
            }
        });
    }
}
