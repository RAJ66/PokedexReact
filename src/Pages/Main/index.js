import React , { useState,useEffect} from 'react';
import Axios from 'axios';

import './style.css';

function  Main ()  {
    const [arrayPokemons,setArrayPokemons]= useState([ ])
    const [pagesPokemonsNext,setPagesPokemonsNext]= useState({ })
    const [pagesPokemonsPrevious,setPagesPokemonsPrevious]= useState({ })

  
    useEffect(()=>{loadPokemon()},[])
   
    const loadPokemon = async (url = null) => {
        if (url === null) {
            const response = await Axios.get('https://pokeapi.co/api/v2/pokemon')
        setArrayPokemons(response.data.results)
        setPagesPokemonsNext(response.data.next)
        setPagesPokemonsPrevious(response.data.previous)
        } else {
            const response = await Axios.get(url)
        setArrayPokemons(response.data.results)
        setPagesPokemonsNext(response.data.next)
        setPagesPokemonsPrevious(response.data.previous)
        }
    }
   
    const nextPage = () => {
        
        loadPokemon(pagesPokemonsNext);
    }

    
    const prevPage = () => {
        
        loadPokemon(pagesPokemonsPrevious);
    }


        return (
            <div className='pokemon-list' >
                {arrayPokemons.map(pokemon => (
                    <article id={pokemon.name}>
                        <strong>
                            {pokemon.name}
                        </strong>
                    </article>
                ))}

            <div className='actions'>
                    <button onClick={()=>prevPage()} >Anterior</button>
                    <button onClick={()=>nextPage()} >Proximo</button>
            </div>

            </div>
        )
}



export default Main;