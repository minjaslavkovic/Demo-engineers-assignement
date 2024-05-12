const algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");
const pokedex = require('./pokedex.json');
const axios = require("axios");

dotenv.config();

// Algolia client credentials.
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

// Initialize the client.
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

// Initialize an index.
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// Upload the data to Algolia.
const uploadPokemonData = async () => {
  try {
    // Create an array to store objects with specified objectIDs.
    const transformDataWithObjectIDs = pokedex.map(item => {
      return {
        ...item,
        objectID: item.id 
      };
    });

    const pokedexWithObjectIDs = transformDataWithObjectIDs;

    // Save objects: Add multiple objects to an index.
    console.log("Save objects - Adding multiple objects: ", pokedex);
    await index.saveObjects(pokedexWithObjectIDs).wait();

    const res = await index.search("");
    console.log("Current objects: ", res.hits);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Enrich the data using PokéAPI.
const getPokemonInfo = async pokemonId => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = response.data;

    // Extract image URLs.
    const imageUrls = [
      data.sprites.other["official-artwork"].front_default,
      data.sprites.other["official-artwork"].front_shiny,
      data.sprites.other["home"].front_default,
      data.sprites.other["home"].front_shiny
    ]

    // Extract game versions.
    const gameVersions = data.game_indices.map(game => game.version.name);

    // Extract Pokemon height.
    const height = data.height;

    // Extract Pokemon abilities.
    const abilities = data.abilities.map(ability => ability.ability.name);

    return {
      imageUrls,
      gameVersions,
      height,
      abilities
    };
  } catch (error) {
    console.error("Error fetching Pokémon information:", error);
    return null;
  }
};

const enrichPokemonData = async () => {
  try {
    let hits = [];

    // Get all records as an iterator.
    await index.browseObjects({
      batch: batch => {
        hits = hits.concat(batch);
      }
    });

    // Update records with PokeAPI information.
    const updatedRecords = await Promise.all(
      hits.map(async hit => {
        const pokemonId = hit.id;
        const pokemonInfo = await getPokemonInfo(pokemonId);

        if (pokemonInfo) {
          return {
            objectID: hit.objectID,
            imageUrls: pokemonInfo.imageUrls,
            game_versions: pokemonInfo.gameVersions,
            height: pokemonInfo.height,
            abilities: pokemonInfo.abilities
          };
        } else {
          return null;
        }
      })
    );

    // Update records in Algolia.
    await index.partialUpdateObjects(updatedRecords);
    console.log("Records updated successfully.");
  } catch (error) {
    console.error("Error updating records:", error);
  }
};

(async () => {
  await uploadPokemonData();
  await enrichPokemonData();
})();
