let boton = document.querySelector("#button").addEventListener("click",traductor2)


async function traductor2(){
    const url = 'https://opentranslator.p.rapidapi.com/translate';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '82b19db4bfmsh443d4bd48be6801p14ae16jsn72e22efc6486',
		'X-RapidAPI-Host': 'opentranslator.p.rapidapi.com'
	},
	body:JSON.stringify({
		text: 'An epic adventure across the land and skies of Hyrule awaits in The Legend of Zelda": Tears of the Kingdom for Nintendo Switch". The adventure is yours to create in a world fueled by your imagination. In this sequel to The Legend of Zelda: Breath of the Wild, youll decide your own path through the sprawling landscapes of Hyrule and the mysterious islands floating in the vast skies above. Can you harness the power of Links new abilities to fight back against the malevolent forces that threaten the kingdom',
		target: 'es'
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}
}



async function traductor(){
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '82b19db4bfmsh443d4bd48be6801p14ae16jsn72e22efc6486',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'en',
            target_language: 'id',
            text: 'What is your name?'
        })
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    } 
}
