import Address from "../models/address.js";
import * as requestService from "../services/request-service.js";
import * as addressService from "../services/adress-service.js"
import * as listController from "../controllers/list-controller.js"

function State(){

    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}

const state = new State();


export function init(){
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorNumber = document.querySelector('[data-error="number"]');
    state.errorCep = document.querySelector('[data-error="cep"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputNumber.addEventListener('change', handleInputNumberChangeKeyUp);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange)
}

async function handleInputCepChange(event) {
    const cep = event.target.value;

    try {
        const address =  await addressService.findByCep(cep);

        state.inputCity.value = address.city;
        state.inputStreet.value= address.street;
        state.address  = address;
    
        setFormError("cep", "");
        state.inputNumber.focus();
    
        console.log(address);
    } catch (e) {
        setFormError("cep", "Informe um Cep Válido");
        state.inputCity.value = "";
        state.inputStreet.value= "";
        state.address  = "";
    }

  
}

function handleInputNumberChange(event){
    if (event.target.value == ""){
        setFormError("number", "Campo Requerido");
    } else {
        setFormError("number", "");
    }
}

function handleBtnClearClick(event){
    event.preventDefault();
    clearForm();
}

 function handleBtnSaveClick(event){   
    event.preventDefault();

    const errors = addressService.getErrors(state.address);

    const keys = Object.keys(errors);

    if(keys.length>0){
        for (let i =0; i<keys.length; i++){
            setFormError(keys[i], errors[keys[i]]);
        }
    }else{
        console.log(errors)

        listController.addCard(state.address);
        clearForm();
    }

 
}

function clearForm(){
    state.inputCep.value = '';
    state.inputCity.value = '';
    state.inputNumber.value = '';
    state.inputStreet.value = '';

    setFormError("cep", "")
    setFormError("number", "")

    state.address = new Address();
    state.inputCep.focus()
}

function setFormError(key, value){
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}

function handleInputNumberChangeKeyUp(event){
    state.address.number = event.target.value;
}