function photographerFactory(data) {
    const { name, portrait, tagline, city , country, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement ('a');
        //
        const fig = document.createElement('figure');
        fig.setAttribute("class","img_container");

        //traitement image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "photographes");
        img.setAttribute("aria-label" , "image du photographe , lien vers la page du photographe")



        //traitement nom - prénom
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        //traitement city - country
        const cityC = document.createElement('h2');
        cityC.setAttribute("class"  ,"city")
        cityC.textContent = city + " , " + country;

        //traitement prix
        const priceItem = document.createElement('p');
        priceItem.textContent = price + "€/jour";
        priceItem.setAttribute("class" , "price");

        //traitement paragraphe du photographe
        const par = document.createElement("p");
        par.textContent = tagline;

        //---
        link.setAttribute("href" , "photographer.html?id=" + id);



        //---
        fig.appendChild(img);
        link.appendChild(fig);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(cityC)
        article.appendChild(par);
        article.appendChild(priceItem);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}