import React from 'react';
import Details from './details/Details';
// import Preview from './preview/Preview';
// import EvolutionChain from './evolutionChain/EvolutionChain';

function App() {
  const pokemonId = 654;
  return (
    <div>
      <Details id={pokemonId} />
      {/* <Preview id={pokemonId} />
      <EvolutionChain id={pokemonId} /> */}
    </div>
  );
}

export default App;
