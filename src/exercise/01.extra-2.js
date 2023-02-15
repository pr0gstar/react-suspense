// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'

let pokemonPromise = createPokemonResource(fetchPokemon('pikachu'))

function createPokemonResource(promise) {
  let status = 'pending'
  let result = promise.then(
    resolved => {
      status = 'resolved'
      result = resolved
    },
    rejected => {
      status = 'rejected'
      result = rejected
    },
  )
  return {
    read() {
      if (status === 'pending') {
        throw result
      }
      if (status === 'rejected') {
        throw result
      }
      if (status === 'resolved') {
        return result
      }
      throw new Error('This should be imposible!')
    },
  }
}

function PokemonInfo() {
  const pokemon = pokemonPromise.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<div>Loading...</div>}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
