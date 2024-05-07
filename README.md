# Demo-engineers-assignement: Pokémon Search Experience with Algolia

This project is a responsive web application that enables users to search for Pokémon using Algolia. It integrates with the PokéAPI to enrich the Pokémon data and implementing dynamic search features with filters, including a language switcher to display Pokémon names in multiple languages. It also includes an image switcher and a modal that represents each Pokémon.

## Pokedex

The `pokedex/` directory contains the Algolia indexing of the relevant PokéAPI resources. See its [readme](pokedex/README.md) for more.

## Web App

The web app is located in `react-boilerplate/` directory (as forked from the original repo).

It's deployed with [Vercel](https://vercel.com/) and can be found at: https://demo-engineers-assignement-minja-slavkovics-projects.vercel.app/

Vercel deployment relies on the `dist/` subdirectory being present and it can be updated by running `$ npm run build`

## Technologies Used

* Algolia InstantSearch
* React
* TypeScript
* Vite
* React Spectrum
* TailwindCss
* Vercel

## Features

* Live search results page: We're using InstantSearch to dynamically display results while typing in the search bar.
* Search refinement list: The sidebar on the left contains search filters and range sliders (using Spectrum).
* Search results preview: When clicked on the individual Pokémon, a modal window pops up and displays its image and characteristics.
* Language Switcher: Allows users to switch between different languages for the application.
  * This setting is preserved upon page reload, which is implemented using react local storage.
* Image Switcher: Provides users with the ability to switch between different Pokémon image sets.
  * This setting is preserved upon page reload, which is implemented using react local storage.


