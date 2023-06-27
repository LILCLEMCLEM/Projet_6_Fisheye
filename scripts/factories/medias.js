/*CODE AJOUTE -------------------------------------------
la classe "CreateContent()" prend en paramètres "title" en + , afin de l'ajouter aux images en tant que attribut "alt"
*/
function photographer_medias() {

    async function getPhotographersInfos() {
        const photographer_id = getID();
        const response = await fetch("data/photographers.json");
        const photographers_infos = await response.json();
        let infos = photographers_infos.media.filter(Element => {
            return Element.photographerId == photographer_id;
        });
    
        return infos;
    }
    
    //recupérer l'id de l'URL
     function getID(){
        const param = new URLSearchParams(document.location.search);
        return param.get("id");
        
    }

    //CODE AJOUTE -------------------------------------------
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    document.getElementById("contact_button").addEventListener("click", function(event){
        event.preventDefault()
        let err = false;
        const prenom = document.getElementById("prenom");
        if(prenom.value == "") {
           err = true
        }

        const nom = document.getElementById("nom");
        if(nom.value == "") {
            err = true
        }

        const email = document.getElementById("email");
        if(email.value == "") {
            err = true
        }
        if (!regex.test(String(email.value).toLowerCase()))
        {
            err = true
        }

        const message = document.getElementById("message");
        if(message.value == "") {
            err = true
        }

        //log 
        if(err == true) {
            alert("erreur champs vide et/ou email incorrect")
        } else {
            console.table(prenom.value , nom.value , email.value , message.value)
        }
        
      });
    //FIN CODE AJOUTE -------------------------------------------------


    async function display_header(){
        //recupeartion et filtrage pour obtenir les infos du photographe ayant le bon ID
        const header_section = document.querySelector(".photograph-header");
        const response = await fetch("data/photographers.json");
        const photographers = await response.json();
    
        
        const param_id = getID();
    
        const result = photographers.photographers.filter(Element =>{
            
            return Element.id == param_id;
        });

        
    
        //création element
        let {name , city , country, tagline, portrait} = result[0];
        const Prenom = document.createElement("h1");
        Prenom.setAttribute("tabindex" , "0")
        const Ville = document.createElement("h2");
        Ville.setAttribute("tabindex" , "0")
        const Tag = document.createElement("p");
        Tag.setAttribute("tabindex" , "0")
        const img = document.createElement("img");
        img.setAttribute("tabindex" , "0")
    
        const Info_photograph = document.createElement("div");
        const Contact = document.createElement("button");
        Contact.setAttribute("class" , "contact_button");
        Contact.setAttribute("onclick" , "displayModal()");
        Contact.textContent = "Contactez-moi";
        Info_photograph.setAttribute("class" , "align_text");
        Prenom.textContent = name;
        Ville.textContent = city + " , "   + country;
        Tag.textContent = tagline;
        img.src = `assets/photographers/${portrait}`;
        img.setAttribute("alt" , "photographers")
    
        const fig = document.createElement('figure');
        fig.setAttribute("class","img_container");
       
        fig.appendChild(img);
        Info_photograph.appendChild(Prenom);
        Info_photograph.appendChild(Ville);
        Info_photograph.appendChild(Tag);
        header_section.appendChild(Info_photograph);
        header_section.appendChild(Contact);
        header_section.appendChild(fig);
        return (header_section);
    }
    
    async function display_data() {
        const response = await fetch("data/photographers.json");
        const photographers = await response.json();
    
        const param_id = getID();
    
        const result = photographers.photographers.filter(Element =>{
            return Element.id == param_id;
        });
        const main = document.getElementById("main");
        main.setAttribute("class" , "main_container");
        let main_section = document.querySelector(".photographer-section");
        let photographer_d = await getPhotographersInfos();
        
        let {name , price} = result[0];
        
        var actual_order = "up"
        
       
        
    
        //filter
        const filter = document.createElement("section");
        filter.setAttribute("class" , "filter_container");
        
        
    
        const filter_text = document.createElement("label");
        filter_text.textContent = "trier par ";
        filter_text.setAttribute("tabindex" , "0");
        filter_text.setAttribute("for" , "filter-select")
    
        var filter_type = document.createElement("select");
        filter_type.setAttribute("name" , "filtres")
        filter_type.setAttribute("tabindex" , "0")
        filter_type.setAttribute("class" , "filter_type");
        filter_type.setAttribute("id" , "filter-select")
        const filter_name = ["popularité" , "date" , "titre"];
      
        
        
        
        for(let element = 0 ; element < 3 ;element++) {
            let element_n = filter_name[element]
            const filter_name_container = document.createElement("option")
            filter_name_container.setAttribute("name" , "filter")
            
            filter_name_container.setAttribute("value" , element_n);
            filter_name_container.textContent = element_n
            filter_name_container.setAttribute("tabindex" , "0")
            
    
            ;
            
            
            filter_type.appendChild(filter_name_container);
            
        };
    
    
        
        console.log(filter_type)
        filter_type.addEventListener("change" , function(f) {
            
            
            
            switch(filter_type.value){
                
                case "popularité" :         
                        photographer_d.sort((b , a) => {
                            
                            return a.likes - b.likes;
                        });    
                break;
    
                case "date":
                    
                    
                        photographer_d.sort((a , b) => {
                            
                            const d1 = new Date(a.date);
                            const d2 = new Date(b.date);
                            
                            return d1 - d2;
                        });
                        
    
                break;
    
                case "titre":
                   
                    
                    
                        photographer_d.sort((a , b) => {
                            if(a.title < b.title) { return -1; }
                            if(a.title > b.title) { return 1; }
                            return 0;
                        });
                        
                        break;
                        
                    
            };
            
            main_section.innerHTML = "";
            main_section = createDisplay(photographer_d , name , main_section);
            
            main_section.appendChild(foot_content);
            main.appendChild(main_section)
            return main
            
        })
        filter.appendChild(filter_text);
        
        filter.appendChild(filter_type);
        
    
        main_section = createDisplay(photographer_d , name , main_section)
    
       
    
    
    
        
        //ajout like et  prix/jour
        const foot_content = document.createElement("div");
        const foot_items= document.createElement("div");
        foot_content.setAttribute("class" , "footer_container");
        foot_items.setAttribute("class" , "footer_items");
        const total_like = document.createElement("p");
       
        total_like.setAttribute("tabindex" , "0")
        total_like.setAttribute("id" , "likes")
        const like_font = document.createElement("i");
        like_font.setAttribute("class" , "fa-solid fa-heart");
        
        
        
        const price_day = document.createElement("p");
        
        price_day.setAttribute("tabindex" , "0")
        
        
        let sumOfLikes = 0;
        
        photographer_d.forEach(element => {
            sumOfLikes += element.likes
            
            return sumOfLikes 
        });
     
        
    
        total_like.textContent = sumOfLikes;
        
        
        price_day.textContent = price + "€ / jour";
    
        foot_items.appendChild(total_like);
        foot_items.appendChild(like_font);
        foot_items.appendChild(price_day);
        foot_content.appendChild(foot_items);
        main_section.appendChild(foot_content);
        main.appendChild(filter)
        main.appendChild(main_section)
        return main;
        
    }

    //afficher la galerie du photographe


function CreateContent(content, p_name, vid , title) {   
    let extension = null;
    let items_img;
    
    if(vid != null)
    {
        extension ="mp4";
    }
    
    if(extension == "mp4")
    {
        items_img = document.createElement("video");
        
        
        items_img.src = "data/" + p_name.split(" ")[0].replace(/-/g,' ') + "/" + vid;
        
        items_img.setAttribute("loop" , "");
        items_img.setAttribute("muted" , "");
        
    }
    else{
        items_img = document.createElement("img");
        items_img.setAttribute("alt" , title);
        items_img.src = "data/" + p_name.split(" ")[0].replace(/-/g,' ') + "/" + content;
    }

    return items_img;
}

var temp = (event) => {
    console.log("call")
    const previous_img = document.getElementById("prev_img");
    const next_img = document.getElementById("next_img");
        if(event.code === "ArrowLeft") {
            
            previous_img.click();
          }

          if(event.code === "ArrowRight") {
            
            next_img.click();
          }
          
}



function show_items(photographer_data, name, elem_id){
     index = -1;
    
    //filtrer les données
    var filter = photographer_data.find(function(item, i){
        if(item.id === elem_id){
          index = i;
          return i;
        }
      });
      
    
    

    //cacher background
    const Hide_header = document.querySelector(".photograph-header");
    const Hide_main = document.querySelector(".photographer-section");
    const Hide_filter = document.querySelector(".filter_container");
    
    const head = document.querySelector("header");
    head.style.visibility = "hidden";
    Hide_header.style.visibility = "hidden";
    Hide_main.style.visibility = "hidden";
    Hide_filter.style.visibility = "hidden";

    
    //creation vue
    const WideView = document.querySelector(".photographer_wide");
    
    const Wide_Container = document.createElement("div");
    Wide_Container.setAttribute("class" , "img_display");
    const Wide_name = document.createElement("div");
    Wide_name.setAttribute("class" , "align_name");
    WideView.className = "photographer_wide open";
    var previous_img = document.createElement("i");
    previous_img.setAttribute("id" , "prev_img");
    
    previous_img.setAttribute("tabindex" , "0")
    var next_img = document.createElement("i");
    ;
    next_img.setAttribute("id" , "next_img")
    next_img.setAttribute("tabindex" , "0")
    const close_img = document.createElement("i");
    close_img.setAttribute("tabindex" , "0")
    const items_name = document.createElement("h1");
    items_name.setAttribute("tabindex" , "0")
    close_img.setAttribute("class" , "fa-solid fa-xmark");
    previous_img.setAttribute("class" , "fa-solid fa-chevron-left");
    next_img.setAttribute("class" , "fa-solid fa-chevron-right");
    
    
    

    next_img.addEventListener("click" , () =>{
       
        WideView.innerHTML = "";
        Wide_name.innerHTML = "";
        if(index < photographer_data.length - 1){
            show_items(photographer_data, name, photographer_data[index+1].id )
        }
        else{
            index = 0;
            
            show_items(photographer_data, name, photographer_data[index].id)
        }
        
    })

    var DocListener = temp;
    

    document.addEventListener('keyup' , DocListener)
        
    

    next_img.addEventListener('keyup', (event) => {
        if(event.code === 'Enter') {
          next_img.click();
        }
       
        
      });

   

    previous_img.addEventListener("click" , () =>{
        
        WideView.innerHTML = "";
        Wide_name.innerHTML = "";
        if(index>0){
            show_items(photographer_data, name, photographer_data[index-1].id )
        }
        else{
            index = photographer_data.length;
            
            show_items(photographer_data, name, photographer_data[index-1].id)
        }
    })

    previous_img.addEventListener('keyup', (event) => {
        if(event.code === 'Enter') {
          previous_img.click();
        }
      
      });

   

      
    close_img.addEventListener("click" , () => {
        head.style.visibility = "visible";
        Hide_header.style.visibility = "visible";
        Hide_main.style.visibility = "visible";
        Hide_filter.style.visibility = "visible";
        WideView.innerHTML = "";
        document.removeEventListener('keyup' , DocListener)
        WideView.className = "photographer_wide";
       
        Wide_name.innerHTML = "";
    });

    close_img.addEventListener('keydown', (event) => {
        if(event.code === 'Enter') {
          close_img.click();
          
        }
      });

      
    items_name.textContent = photographer_data[index].title;
    
    const Wide_img = CreateContent(photographer_data[index].image , name , photographer_data[index].video , photographer_data[index].title);
    
    
    Wide_Container.appendChild(previous_img);
    Wide_Container.appendChild(Wide_img);
    Wide_Container.appendChild(next_img);
    Wide_Container.appendChild(close_img);
    Wide_name.appendChild(items_name);
    WideView.appendChild(Wide_Container);
    WideView.appendChild(Wide_name);
    
    //return(WideView);
    }

    function createDisplay(photographer_data , _name , section) {
        let sumOfLikes = 0;
        
        photographer_data.forEach(element => {
            var {title , image , video , likes , id , date } = element;
            
            const Container = document.createElement("div");
    
            Container.setAttribute("class" , "items_container");
            
            //fonction pour déterminer si c'est une image ou une video
            const items_img = CreateContent(image , _name , video , title);
            items_img.setAttribute("tabindex" , "0")
            items_img.addEventListener('keydown', (event) => {
                if(event.code === 'Enter') {
                  items_img.click();
                }
              });
            const bottom_img = document.createElement("div");
            bottom_img.setAttribute("class" , "element_display");
            const photographer_likes = document.createElement("p");
            photographer_likes.setAttribute("tabindex" , "0")
            const photo_name = document.createElement("h2");
            photo_name.setAttribute("tabindex" , "0")
            const heart = document.createElement("i");
            heart.setAttribute("aria-label" , "likes")
            heart.setAttribute("tabindex" , "0");
            heart.setAttribute("class" , "fa-solid fa-heart");
            heart.addEventListener('keydown', (event) => {
                if(event.code === 'Enter') {
                  heart.click();
                }
              });
            items_img.addEventListener("click" , () => show_items(photographer_data, _name , id));
            
            heart.addEventListener("click" , () => {
                const like_element = document.getElementById("likes");
                console.log(like_element)
                if( photographer_likes.textContent == likes + 1)
                {
                    photographer_likes.textContent = likes;
                    like_element.textContent = +like_element.textContent - 1 ;
                    heart.setAttribute("class" , "fa-solid fa-heart ");
                }
                else if ( photographer_likes.textContent == likes)
                {
                    photographer_likes.textContent = likes + 1;
                    like_element.textContent = +like_element.textContent + 1 ;
                    heart.setAttribute("class" , "fa-solid fa-heart clicked");
                }
            })
            photo_name.textContent = title;
            photographer_likes.textContent = likes;
            
            
            bottom_img.appendChild(photo_name);
            bottom_img.appendChild(photographer_likes);
            bottom_img.appendChild(heart);
            Container.appendChild(items_img);
            Container.appendChild(bottom_img);
            section.appendChild(Container);
            
            
        });
        
        return section;
    }
    

    

    return {display_header , display_data}
}