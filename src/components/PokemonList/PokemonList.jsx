 import axios from 'axios'
 import './PokemonList.css'
 import Pokemon from '../Pokemon/Pokemon'
 import { useEffect, useState } from 'react'

 function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon"

    async function downloadPokemon(){
        const response = await axios.get(POKEDEX_URL);
        
        const pokemonResult = response.data.results

        const pokemonPromise = pokemonResult.map((pokemon)=>axios.get(pokemon.url))
        
        const pokemonListData = await axios.all(pokemonPromise)

        const pokemonFinalList = pokemonListData.map(pokemonData=>{

        const pokemon = pokemonData.data;
        return{
            id:pokemon.id,
            name:pokemon.name,
            image:pokemon.sprites.other.dream_world.front_default,
            types:pokemon.types
        }
    })
    setPokemonList(pokemonFinalList)
    // console.log(pokemonFinalList)
    }
    useEffect(()=>{
        downloadPokemon()
    },[])
    return(
        <div className='pokemon-list-wrapper'>
            <div>Pokemon List</div>
            <div className='pokemon-list'>
            {pokemonList.map(pokemon =><Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image}/>)}
        </div>
        </div>
    )

 }
 export default PokemonList
