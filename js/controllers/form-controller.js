import Address from "../models/address.js";
import * as AddressService from "../services/address-service.js";
import * as listController from "./list-controller.js";

function State() {
  this.address = new Address();
  this.btnSave = null;
  this.btnClear = null;
  this.inputCep = null;
  this.inputCity = null;
  this.inputState = null;
  this.inputNeighborhood = null;
  this.errorCep = null;
  this.btnCityCrescent = null;
  this.btnCityDecrescent = null;
  this.btnNeighborhoodCrescent = null;
  this.btnNeighborhoodDecrescent = null;
  this.btnStateCrescent = null;
  this.btnStateDecrescent = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputNeighborhood = document.forms.newAddress.neighborhood;
  state.inputCity = document.forms.newAddress.city;
  state.inputState = document.forms.newAddress.state;

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.btnCityCrescent = document.querySelector("#btn-city-crescent");
  state.btnCityDecrescent = document.querySelector("#btn-city-decrescent");
  state.btnNeighborhoodCrescent = document.querySelector(
    "#btn-neighborhood-crescent"
  );
  state.btnNeighborhoodDecrescent = document.querySelector(
    "#btn-neighborhood-decrescent"
  );
  state.btnStateCrescent = document.querySelector("#btn-state-crescent");
  state.btnStateDecrescent = document.querySelector("#btn-state-decrescent");

  state.errorCep = document.querySelector('[data-error="cep"]');

  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
  state.inputCep.addEventListener("change", handleInputCepChange);
  state.btnCityCrescent.addEventListener("click", handleBtnCityCrescentClick);
  state.btnCityDecrescent.addEventListener(
    "click",
    handleBtnCityDecrescentClick
  );
  state.btnNeighborhoodCrescent.addEventListener(
    "click",
    handleBtnNeighborhoodCrescentClick
  );
  state.btnNeighborhoodDecrescent.addEventListener(
    "click",
    handleBtnNeighborhoodDecrescentClick
  );
  state.btnStateCrescent.addEventListener("click", handleBtnStateCrescentClick);
  state.btnStateDecrescent.addEventListener(
    "click",
    handleBtnStateDecrescentClick
  );
}

function handleBtnSaveClick(event) {
  event.preventDefault();

  const errors = AddressService.getErrors(state.address);

  const keys = Object.keys(errors);

  if (keys.length > 0) {
    setFormError(keys, errors.cep);
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
    state.inputNeighborhood.value = address.neighborhood;
    state.inputState.value = address.state;
    state.address = address;
    setFormError("cep", "");
  } catch (e) {
    state.inputNeighborhood.value = "";
    state.inputCity.value = "";
    state.inputState.value = "";
    setFormError("cep", "Informe um CEP válido");
  }
}

function handleBtnCityCrescentClick(date) {
  const listCrescent = listController.sortByCityAscending(date);
  listController.updateCardDisplay(listCrescent);
  listCrescent.forEach((address) => {
    listController.addCard(address);
  });
}

function handleBtnCityDecrescentClick() {
  const listDecrescent = listController.sortByCityDescending();
  listController.updateCardDisplay(listDecrescent);
  listDecrescent.forEach((address) => {
    listController.addCard(address);
  });
}

function handleBtnNeighborhoodCrescentClick() {
  const listCrescent = listController.sortByNeighborhoodAscending();
  listController.updateCardDisplay(listCrescent);
  listCrescent.forEach((address) => {
    listController.addCard(address);
  });
}

function handleBtnNeighborhoodDecrescentClick() {
  const listDecrescent = listController.sortByNeighborhoodDescending();
  listController.updateCardDisplay(listDecrescent);
  listDecrescent.forEach((address) => {
    listController.addCard(address);
  });
}

function handleBtnStateCrescentClick() {
  const listCrescent = listController.sortByStateAscending();
  listController.updateCardDisplay(listCrescent);
  listCrescent.forEach((address) => {
    listController.addCard(address);
  });
}

function handleBtnStateDecrescentClick() {
  const listDecrescent = listController.sortByStateDescending();
  listController.updateCardDisplay(listDecrescent);
  listDecrescent.forEach((address) => {
    listController.addCard(address);
  });
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
  state.inputNeighborhood.value = "";
  state.inputState.value = "";

  setFormError("cep", "");

  state.address = new Address();

  state.inputCep.focus();
}
