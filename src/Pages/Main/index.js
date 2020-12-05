import React , { useState,useEffect} from 'react';
import Axios from 'axios';

import './style.css';

function  Main ()  {
    const [arrayPokemons,setArrayPokemons]= useState([ ])
    const [pagesPokemonsNext,setPagesPokemonsNext]= useState({ })
    const [pagesPokemonsPrevious,setPagesPokemonsPrevious]= useState({ })

  
    useEffect(()=>{loadPokemon()},[])


   const getInfo = async(data)=>{
       return Promise.all(data.map(async(pokemon)=>{ 
        const response = await Axios.get(pokemon.url)
        pokemon.img =  response.data.sprites.back_default;
        return Promise.resolve(pokemon)
    }
    ))
   }
   
    const loadPokemon = async (url = null) => {
        let response;
        if (url === null) {
             response = await Axios.get('https://pokeapi.co/api/v2/pokemon')
        } else {
             response = await Axios.get(url)
        }
        const pokemons = response.data.results;
            await getInfo(pokemons).then(data=>{
                setArrayPokemons(data)})

        setPagesPokemonsNext(response.data.next)
        setPagesPokemonsPrevious(response.data.previous)
           }
   
    const nextPage = () => {
        
        loadPokemon(pagesPokemonsNext);
    }

    
    const prevPage = () => {
        
        loadPokemon(pagesPokemonsPrevious);
    }


        return (
            <div className='pokemon-list' >
                {arrayPokemons.length>0 && arrayPokemons.map(pokemon => {
                    console.log("pokemon.img")
                    //console.log(pokemon.img)
                   // console.log(pokemon.name)

                    return (
                    <article id={pokemon.name}>
                        <strong>
                            {pokemon.name}
                        </strong>
                        <img src={pokemon.img}/>
                    </article>)}
                )}

            <div className='actions'>
                    <button onClick={()=>prevPage()} >Anterior</button>
                    <button onClick={()=>nextPage()} >Proximo</button>
            </div>

            </div>
        )
}



export default Main;