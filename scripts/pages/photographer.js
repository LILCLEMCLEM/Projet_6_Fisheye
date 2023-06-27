//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const photographers = await response.json();
    

    // et bien retourner le tableau photographers seulement une fois récupéré
    return photographers
}


async function init_page(){
    const {photographers} = await getPhotographers();
    const media = photographer_medias(photographers); 
    media.display_header(photographers);
    media.display_data();

    
}

init_page();





