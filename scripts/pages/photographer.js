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

    //affichage du message
    document.getElementById("contact_button").addEventListener("click", function(event){
        event.preventDefault()
        const prenom = document.getElementById("prenom");
        console.log(prenom.value)

        const nom = document.getElementById("nom");
        console.log(nom.value)

        const email = document.getElementById("email");
        console.log(email.value)

        const message = document.getElementById("message");
        console.log(message.value)
      });
}

init_page();





