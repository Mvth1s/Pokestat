// model.js
class PokemonModel {
	constructor() {
		this.pokemons = [];
		this.sparqlEndpoint =
			"https://api.triplydb.com/datasets/academy/pokemon/services/jena/sparql";
		this.query = `
            prefix foaf: <http://xmlns.com/foaf/0.1/>
            prefix pokemon: <https://triplydb.com/academy/pokemon/id/pokemon/>
            prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            prefix sdo: <http://schema.org/>
            prefix vocab: <https://triplydb.com/academy/pokemon/vocab/>

            select ?pokemon ?image ?name ?attack ?defense ?health ?speed ?number ?typeName1 ?typeName2 {
                ?pokemon a vocab:Pokémon;
                    foaf:depiction ?image;
                    rdfs:label ?label;
                    vocab:baseAttack ?attack;
                    vocab:baseDefense ?defense;
                    vocab:baseHP ?health;
                    vocab:baseSpeed ?speed;
                    vocab:name ?name;
                    vocab:nationalNumber ?number.
                filter(langmatches(lang(?name),'fr'))

                optional {
                    ?pokemon vocab:type ?type1.
                    ?type1 rdfs:label ?typeName1.
                }

                optional {
                    ?pokemon vocab:type ?type2.
                    ?type2 rdfs:label ?typeName2.
                    filter(?type2 != ?type1 && ?typeName1 < ?typeName2)
                }
            }
            group by ?pokemon ?image ?name ?attack ?defense ?health ?speed ?number ?typeName1 ?typeName2
            order by (?number)
        `;
	}

	async fetchPokemons() {
		try {
			const response = await fetch(
				this.sparqlEndpoint +
					"?query=" +
					encodeURIComponent(this.query) +
					"&format=json"
			);
			const data = await response.json();
			if (Array.isArray(data)) {
				this.pokemons = data;
				console.log(this.pokemons);
			} else {
				console.error("Unexpected response structure:", data);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	getPokemons() {
		return this.pokemons;
	}
}

class PokemonStatModel {}
