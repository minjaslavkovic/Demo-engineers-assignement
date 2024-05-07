# Indexing and Transforming Data for Pokémon Search

This guide explains how to index and transform Pokémon data for search using Algolia and PokeAPI.

## Requirements

1. **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

2. **Algolia Account**: Sign up for an Algolia account at [Algolia](https://www.algolia.com/). Create a new index to store Pokémon data.

3. **PokéAPI**: Obtain Pokémon data in JSON format. You can use sources like [PokéAPI](https://pokeapi.co/) or other datasets.

## Running

Run with `$ node indexing.js` and don't forget to provide the relevant ENV variables:

* `ALGOLIA_APP_ID`
* `ALGOLIA_API_KEY`
* `ALGOLIA_INDEX_NAME`
