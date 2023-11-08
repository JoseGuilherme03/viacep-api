import Address from "../models/address.js";
import * as requestService from "../services/request-service.js";
import * as AddressService from "../services/address-service.js";

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

async function handleBtnSaveClick(event) {
  event.preventDefault();
  const result = await requestService.getJson(
    "https://viacep.com.br/ws/89231400/json/"
  );
  console.log(result);
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

  state.inputCep.focus();
}
