// views/views.js
class PokemonView {
	constructor() {
		this.pokemonContainer = document.getElementById("cards-container");
		this.typeColors = {
			"Normal Type": "#9a9a9a",
			"Fighting Type": "#8c4f00",
			"Flying Type": "#e4dcff",
			"Poison Type": "#670067",
			"Ground Type": "#E0C068",
			"Rock Type": "#B8A038",
			"Bug Type": "#8dd588",
			"Ghost Type": "#705898",
			"Steel Type": "#8b8ba1",
			"Fire Type": "#f03030",
			"Water Type": "#6890F0",
			"Grass Type": "#319300",
			"Electric Type": "#F8D030",
			"Psychic Type": "#F85888",
			"Ice Type": "#98D8D8",
			"Dragon Type": "#7038F8",
			"Dark Type": "#2c2a29",
			// "Fairy Type": "#EE99AC",
			unknown: "#828282",
		};
	}

	renderPokemons(pokemons) {
		this.pokemonContainer.innerHTML = ""; // Clear previous content
		const seenPokemon = new Set();
		pokemons.forEach((result) => {
			if (!seenPokemon.has(result.pokemon)) {
				seenPokemon.add(result.pokemon);
				const pokemonCard = document.createElement("div");
				pokemonCard.className = "pokemon-card";

				// Translate type names to French and determine the background color
				let typeNames = [];
				let color1 = this.typeColors.unknown;
				let color2 = this.typeColors.unknown;

				if (result.typeName1) {
					const type1 = this.translateType(result.typeName1);
					typeNames.push(type1);
					color1 = this.typeColors[result.typeName1] || color1;
				}
				if (result.typeName2) {
					const type2 = this.translateType(result.typeName2);
					typeNames.push(type2);
					color2 = this.typeColors[result.typeName2] || color2;
				}

				// Apply gradient if there are two types
				if (result.typeName1 && result.typeName2) {
					pokemonCard.style.background = `linear-gradient(to right top, ${color1}, ${color2})`;
				} else {
					pokemonCard.style.backgroundColor = color1;
				}

				pokemonCard.innerHTML = `
                    <h1><a href="${result.pokemon}" class="PokemonName">${
					result.name
				}</a></h1>
                    <p>N° Pokédex : ${result.number}</p>
                    <img src="${result.image}" alt="${result.name}">
                    <div class="pokemon-types">
                        ${typeNames.join(", ")}
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

	translateType(typeName) {
		const typeTranslations = {
			"Normal Type": "Normal",
			"Fighting Type": "Combat",
			"Flying Type": "Vol",
			"Poison Type": "Poison",
			"Ground Type": "Sol",
			"Rock Type": "Roche",
			"Bug Type": "Insecte",
			"Ghost Type": "Spectre",
			"Steel Type": "Acier",
			"Fire Type": "Feu",
			"Water Type": "Eau",
			"Grass Type": "Plante",
			"Electric Type": "Électrik",
			"Psychic Type": "Psy",
			"Ice Type": "Glace",
			"Dragon Type": "Dragon",
			"Dark Type": "Ténèbres",
			// "Fairy Type": "Fée",
		};
		return typeTranslations[typeName] || typeName;
	}
}
