import React , { useState,useEffect} from 'react';
import Axios from 'axios';

import './style.css';

function  Main ()  {
    const [arrayPokemons,setArrayPokemons]= useState([ ])
    const [pagesPokemonsNext,setPagesPokemonsNext]= useState({ })
    const [pagesPokemonsPrevious,setPagesPokemonsPrevious]= useState({ })

  
    useEffect(()=>{
        loadPokemon()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


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
                <div className='cards' >
                {arrayPokemons.length>0 && arrayPokemons.map(pokemon => {
                    return (
                    <article id={pokemon.name} className="card">
                        <strong className="card-name">
                            {(pokemon.name).toUpperCase()}
                        </strong>
                        <img src={pokemon.img} className="card-img" alt={pokemon.name}/>
                    </article>)}
                )}
                </div>

            <div className='actions'>
                    <button onClick={()=>prevPage()} >Anterior</button>
                    <button onClick={()=>nextPage()} >Proximo</button>
            </div>

            </div>
        )
}



export default Main;
