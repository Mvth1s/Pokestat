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

class PokemonStatModel {
	constructor() {
		this.pokemons = [];
		this.sparqlEndpoint =
			"https://api.triplydb.com/datasets/academy/pokemon/services/jena/sparql";}
        async fetchPokemonsByType(type) {
		this.query = `
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX pokemon: <https://triplydb.com/academy/pokemon/id/pokemon/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX sdo: <http://schema.org/>
        PREFIX vocab: <https://triplydb.com/academy/pokemon/vocab/>
        PREFIX type: <https://triplydb.com/academy/pokemon/vocab/type/>

        SELECT ?pokemon ?image ?name ?attack ?defense ?health ?speed ?number ?typeName1 ?typeName2 ?totalStats {
            ?pokemon a vocab:Pokémon;
                foaf:depiction ?image;
                vocab:baseAttack ?attack;
                vocab:baseDefense ?defense;
                vocab:baseHP ?health;
                vocab:baseSpeed ?speed;
                vocab:name ?name;
                vocab:nationalNumber ?number.
            FILTER(langmatches(lang(?name),'fr'))

            OPTIONAL {
                ?pokemon vocab:type ?type1.
                ?type1 rdfs:label ?typeName1.
            }

            OPTIONAL {
                ?pokemon vocab:type ?type2.
                ?type2 rdfs:label ?typeName2.
                FILTER(?type2 != ?type1 && ?typeName1 < ?typeName2)
            }
            FILTER(bound(?typeName1) && (!bound(?typeName2) || ?typeName2 != ?typeName1))

            # Filtre pour sélectionner le type de Pokémon
            FILTER (?typeName1 = "${type}" || ?typeName2 = "${type}")

            # Calculer le total des statistiques
            BIND((?attack + ?defense + ?health + ?speed) AS ?totalStats)

            }
        ORDER BY DESC(?totalStats)
        `;
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

        async fetchPokemonsByGen(genMin, genMax) {
            this.query = `
            PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            PREFIX pokemon: <https://triplydb.com/academy/pokemon/id/pokemon/>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX sdo: <http://schema.org/>
            PREFIX vocab: <https://triplydb.com/academy/pokemon/vocab/>
            PREFIX type: <https://triplydb.com/academy/pokemon/vocab/type/>
    
            SELECT ?pokemon ?image ?name ?attack ?defense ?health ?speed ?number ?typeName1 ?typeName2 ?totalStats {
                ?pokemon a vocab:Pokémon;
                    foaf:depiction ?image;
                    vocab:baseAttack ?attack;
                    vocab:baseDefense ?defense;
                    vocab:baseHP ?health;
                    vocab:baseSpeed ?speed;
                    vocab:name ?name;
                    vocab:nationalNumber ?number.
                FILTER(langmatches(lang(?name),'fr'))
    
                OPTIONAL {
                    ?pokemon vocab:type ?type1.
                    ?type1 rdfs:label ?typeName1.
                }
    
                OPTIONAL {
                    ?pokemon vocab:type ?type2.
                    ?type2 rdfs:label ?typeName2.
                    FILTER(?type2 != ?type1 && ?typeName1 < ?typeName2)
                }
    
                # Filtre pour sélectionner la génération de Pokémon
                FILTER (?number >= ${genMin} && ?number <= ${genMax})
    
                # Calculer le total des statistiques
                BIND((?attack + ?defense + ?health + ?speed) AS ?totalStats)
    
                }
            ORDER BY DESC(?totalStats)
            `;
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
