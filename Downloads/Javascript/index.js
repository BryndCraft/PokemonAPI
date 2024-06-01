let ul = document.querySelector(".ul"); //Elemento ul en el cual se metera la lista de pokemons
let imagenPokemon  = document.querySelector(".pokemon-image")//Img donde se pondra la imagen de los pokemons
let pokemonTypes = document.querySelector(".pokemon-types")//Dentro de el se pondran los tipos de los pokemons
let pokeInfo = document.querySelector(".pokemon-description")//Dentro de el se pondra la descripcion de los pokemons
let pokemonList = 800 //Numero de pokemons que se mostraran

let pokedexSearch = {} //Un objeto que tiene toda la informacion sobre los pokemons


window.onload = async function(){
    for (let i = 1; i <= pokemonList; i++) {         // Dictamina el numero de pokemons que se generararan en la pokedex
        await getPokemon(i); //Ejecuta la funcion getPokemon() hasta el numero de pokemons que le indicamos
        traductor2(i) //Ejecuta la funcion traductor() que traduce todo la descripcion del pokemon de otro idioma al español
        let listaPokemon = document.createElement("li"); //Creo un elemento li
        listaPokemon.innerHTML = i + `. `+ pokedexSearch[i]["nombre"]; //le añado dentro del li el numero del pokemon y busco dentro de mi pokedex el pokemon y su nombre
        listaPokemon.className = 'pokemon-list-names' // le añado una clase "pokemon-list-names" a todos los pokemons de la pokedex
        listaPokemon.id = i //le añado un id a toda la lista de pokemons de la pokedex
        listaPokemon.addEventListener("click", updatePokemon) //Cuando de click a un pokemon de la pokedex se ejecutara esa funcion
        ul.append(listaPokemon)
    }
    console.log(pokedexSearch)
    
}


async function getPokemon (num){  //Coje el numero de pokemons que le indicamos y busca cual pokemon es
    let url = 'https://pokeapi.co/api/v2/pokemon/' + String(num);  //Es la url del pokemon + el numero del pokemon
    let response = await fetch(url); //Hago un pedido a la url para pedir informacion del pokemon
    let dataPokemon = await response.json(); // Transformo la informacion en formato Json

    let pokemonType = dataPokemon["types"]; //Accedo a la key"types" del objeto que contiene los tipos del pokemon
    let pokemonName = dataPokemon["name"] //Accedo a la key "name" del objeto que es el nombre del pokemon
    let pokemonImg = dataPokemon["sprites"]["front_default"]; //Accedo a la key front_default que es la imagen del pokemonque esta dentro del objeto sprites 
    res = await fetch(dataPokemon["species"]["url"]); //Hago una peticion a la url que esta dentro del objeto species
    
    let pokemonDesc = await res.json(); //Transformo la informacion recibida en un objeto Json
    
    pokemonDesc = pokemonDesc["flavor_text_entries"][26]["flavor_text"] //Entro al objeto "flavor_text_entries" con todas las descripciones en diferentes idiomas del pokemon, elijo la numero 26 y elijo el texto que quiero mostrar
    pokedexSearch[num] = {"nombre": pokemonName, "imagen": pokemonImg, "tipo": pokemonType, "descripcion":pokemonDesc} //Creo un key para pokemon que ingrese que dentro tendra un objeto con el nombre, imagen, tipo y descripcion del pokemon
}


function updatePokemon(){ //Funcion que hara que cambie la informacion de pokemon a pokemon cuando se de click
    let pokemonInfo = document.createElement("p")//Crea un elemento p que dentro de el ira la informacion del pokemon(No esta siendo utilizado sino hasta que utilice el If que tengo comentado)
    pokemonInfo.innerHTML = pokedexSearch[this.id]["descripcion"]; //Ponemos dentro de pokemon info la descripcion del pokemon
    imagenPokemon.src = pokedexSearch[this.id]["imagen"]; //Cambio la imagen del pokemon a la imagen de su id correspondiente
    
    let types = pokedexSearch[this.id]["tipo"]//Selecciono cuales son los tipos del pokemon 

    while(pokemonTypes.firstChild){ //mientras el contenedor que contiene a los tipos tenga elementos hijos quitar el primer hijo a el contenedor
        pokemonTypes.firstChild.remove()
    }

    for (i = 0; i < types.length; i++) { //Un bucle para seleccionar cuantos tipos tiene el pokemon
        let type = document.createElement("span")// Creamos elemento span dependiendo de cuantos tipos tiene el pokemon
        type.innerHTML = types[i]["type"]["name"].toUpperCase() //Metemos los tipos dentro del elemento span y los ponemos en mayuscula
        type.classList.add("type-box"); //Le añadimos la clase"type-box" a los tipos
        type.classList.add(types[i]["type"]["name"])//Le añadimos la clase de los tipos que es el pokemon
        pokemonTypes.append(type) //Metemos todo dentro del contenedor pokemonTypes
        
    }

    
    pokeInfo.innerHTML= pokedexSearch[this.id]["traduccion"] //Le añadimos la descripcion del pokemon traducida al contenedor pokeInfo

    // if(!pokeInfo.firstChild){
    //     pokeInfo.append(pokemonInfo) 
    // }else if(pokeInfo.firstChild){
    //     pokeInfo.replaceChild(pokemonInfo, pokeInfo.firstChild)
    // }
}


async function traductor2(i){ //Funcion que traduce todo lo que le pongas
    const url = 'https://opentranslator.p.rapidapi.com/translate'; //url de la API que traduce
const options = { //Configuraciones que le vamos a hacer a nuestra peticion
	method: 'POST', //metodo que queremos elegir para mandar la informacion
	headers: { //metadatos
		'content-type': 'application/json', //Elegimos que la informacion debe ser que mandamos sera JSON
		'X-RapidAPI-Key': '82b19db4bfmsh443d4bd48be6801p14ae16jsn72e22efc6486', //Key de la API
		'X-RapidAPI-Host': 'opentranslator.p.rapidapi.com' //host de la API 
	},
	body:JSON.stringify({ // Lo que le enviaremos a la Api
		text: pokedexSearch[i][`descripcion`], //Texto a traducir
		target: 'es' //Elegir idioma al que queremos traducir
	})
};

try {
	const response = await fetch(url, options); //Ejecutamos un fetch con la url y nuestra configuracion
	let result = await response.json(); //Convertimos nuestra respuesta en formato JSON
    let traduccion = result[0]["result"]["text"]; //Creamos una variable que tiene dentro el texto traducido
    pokedexSearch[i]["traduccion"] = traduccion //Metemos la traduccion de la descripcion de nuestro pokemon dentro de nuestra pokedexSearch
} catch (error) {
	console.error(error); //Por si hay un error que lo muestre en consola
}
}

