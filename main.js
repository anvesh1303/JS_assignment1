let initialStart = 1;
const limit = 3;
async function FetchData(start, limit){
  let rawData = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${start - 1}&limit=${limit}`);
  let jsonData = await rawData.json();
  return jsonData.results;
}

async function DisplayPokemon(start, limit){
  let pokemonContainer = document.getElementById("pokemon-container");
  pokemonContainer.innerHTML = "";
  let pokemonData = await FetchData(start, limit);
  
  for(pokemon of pokemonData){
    let divElement = document.createElement('div');
    divElement.innerHTML = `<h2>${pokemon.name}</h2>`
    let imgElement = document.createElement('img');
    let pokemonImg = await fetch(pokemon.url);
    let pokemonImgJson = await pokemonImg.json();
    imgElement.src = pokemonImgJson.sprites.front_default;
    divElement.appendChild(imgElement);
    pokemonContainer.appendChild(divElement);
  }
}

DisplayPokemon(initialStart, limit)

document.getElementById("next").addEventListener('click', function(){
  initialStart = initialStart+limit;
  DisplayPokemon(initialStart, limit);
})

document.getElementById("prev").addEventListener('click', function(){
  initialStart = Math.max(1, initialStart-limit);
  DisplayPokemon(initialStart, limit);
})