function displayModal() {
    const modal = document.getElementById("contact_modal");
    const dismodal = document.getElementById("modal_obj");
    dismodal.setAttribute("role" , "alertdialog")
    dismodal.setAttribute("aria-labelledby" , "h2-name")
	modal.style.display = "block";
    const maincontent = document.getElementById("h2-name");
    maincontent.focus();
    
    
    
}
//CODE AJOUTE -------------------------------------------
const close_Modal = document.getElementById("close_modal");
close_Modal.addEventListener("click" , closeModal);
//FIN CODE AJOUTE -------------------------------------------


function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}



//recupérer l'id de l'URL
 function getID(){
    const param = new URLSearchParams(document.location.search);
    return param.get("id");
    
}

async function add_name() {
    const response = await fetch("data/photographers.json");
    const photographers = await response.json();
    
    
    const param_id = getID();

    const result = photographers.photographers.filter(Element =>{
        
        return Element.id == param_id;
    });
    console.log(result)
    const header = document.getElementById("contact_modal");
    
    const title = header.querySelector("h2")
    let {name} = result[0];
    title.innerHTML = "Contactez moi<br>" + name
    title.setAttribute("id" , "h2-name")
    
    

    return title


}

add_name();

