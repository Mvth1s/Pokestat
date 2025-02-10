<<<<<<< HEAD
_Mathis AGUADO_
_Alexy-Alan HEMERY_
_TP5A_

## Question

Quel est le meilleur Pokémon par générations ou par types ?

---

## Explication des données

### Sources de données

1. **CSV** : Utilisé pour récupérer :
    - Le numéro de Pokédex national.
    - La génération du Pokémon.
2. **TriplyDB (SPARQL endpoint)**, Permet d'obtenir :
    - Nom du Pokémon.
    - Numéro de Pokédex national.
    - Statistiques :
        - Attaque.
        - Défense.
        - PV (points de vie).
        - Vitesse.
    - Premier type.
    - Second type (si disponible).

---

## Présentation de l'application

### Étapes principales

1. **Requêtes SPARQL** :

    - Développement et test des requêtes SPARQL pour récupérer les données nécessaires.
    - Intégration des requêtes dans une API permettant leur exécution via JavaScript.

2. **Front-end** :

    - **Technologies** : HTML, CSS, et JavaScript.
    - **Interface utilisateur** :
        - Deux sélecteurs permettent de filtrer les Pokémons par type ou par génération.

3. **Ontologie RDF** :
    - Tentative de création d'un fichier RDF (à l'aide d'Ontotext Refine) pour modéliser les données en Turtle (.ttl).

---

## Informations supplémentaires

### Données tabulaires

Fichier CSV disponible [ici](https://www.data.gouv.fr/fr/datasets/pokemon/#/resources/04df345d-03dd-45f3-aed2-bf3dd55201a2).

-   Modification : Suppression de la première ligne non utile.

### Données RDF

Voir le fichier : `pokemons.ttl`.

### Requêtes SPARQL

Voir le fichier : `model.js`.

### Visualisation des résultats

-   Double-cliquer sur `index.html` pour afficher les résultats.
=======
# Pokestat
>>>>>>> ecf6a8a05644892ee9d6faea6829a27682c5bc4f
