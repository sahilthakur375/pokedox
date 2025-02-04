import './Pokemon.css'

function Pokemon({ name,  url }) {
    return (
        <div className="pokemon">
            <div className='pokemonName'>{name}</div>
            <div><img className='pokemonImage' src={url}/></div>
        </div>
    )
}


export default Pokemon;