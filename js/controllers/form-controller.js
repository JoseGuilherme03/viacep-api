import Address from "../models/address.js";
import * as requestService from "../services/request-service.js";
import * as AddressService from "../services/address-service.js";
import * as listController from "./list-controller.js";

function State() {
  this.address = new Address();
  this.btnSave = null;
  this.btnClear = null;
  this.inputCep = null;
  this.inputStreet = null;
  this.inputCity = null;
  this.inputState = null;
  this.errorCep = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputCity = document.forms.newAddress.city;
  state.inputState = document.forms.newAddress.state;

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.errorCep = document.querySelector('[data-error="cep"]');

  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
  state.inputCep.addEventListener("change", handleInputCepChange);
}

function handleBtnSaveClick(event) {
  event.preventDefault();

  const errors = AddressService.getErrors(state.address);

  const keys = Object.keys(errors);

  if (keys.length > 0) {
    setFormError(keys[0], errors[keys[0]]);
    errors = null
    keys = null
  } else {
    listController.addCard(state.address);
    clearForm();
  }
}

async function handleInputCepChange(event) {
  const cep = event.target.value;

  try {
    const address = await AddressService.findByCep(cep);

    state.inputCity.value = address.city;
    state.inputStreet.value = address.street;
    state.inputState.value = address.state;
    state.address = address;

    setFormError("cep", "");
  } catch (e) {
    state.inputStreet.value = "";
    state.inputCity.value = "";
    state.inputState.value = "";
    setFormError = ("cep", "Informe um CEP válido");
  }
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}

function handleBtnClearClick(event) {
  event.preventDefault();
  clearForm();
}

function clearForm() {
  state.inputCep.value = "";
  state.inputCity.value = "";
  state.inputStreet.value = "";
  state.inputState.value = "";

  setFormError("cep", "");

  state.address = new Address();

  state.inputCep.focus();
}
