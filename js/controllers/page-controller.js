import * as modalController from './modal-controller.js'

export function init(){

    const contactLink = document.querySelector(".contact-link");
    contactLink.addEventListener('click', handleContactLinkClick)
    console.log("Modal Controller Iniciado")
}


function handleContactLinkClick(event){
    event.preventDefault();
    modalController.showModal();
}

