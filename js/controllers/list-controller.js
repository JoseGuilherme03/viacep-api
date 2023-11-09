import * as AddressService from "../services/address-service.js";

function State() {
  this.listSection = null;
}

const state = new State();

export function init() {
  state.listSection = document.querySelector("#list-section");
}

export function addCard(address) {
  const card = creatCard(address);
  state.listSection.appendChild(card);
}

function creatCard(address) {
  const div = document.createElement("div");
  div.classList.add("card-list-item");

  const h3 = document.createElement("h3");
  h3.innerHTML = `${address.city} - ${address.state}`;

  const line = document.createElement("p");
  line.classList.add("address-line");
  line.innerHTML = address.neighborhood;

  const cep = document.createElement("p");
  cep.classList.add("address-cep");
  cep.innerHTML = address.cep;

  div.appendChild(h3);
  div.appendChild(line);
  div.appendChild(cep);

  return div;
}

export function updateCardDisplay(sortedData) {
  const cardContainer = document.querySelector("#list-section");

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

export function sortByCityAscending() {
  const addresses = AddressService.getAddresses();
  addresses.sort(function (a, b) {
    var cityA = a.city.toUpperCase();
    var cityB = b.city.toUpperCase();

    if (cityA < cityB) {
      return -1;
    }
    if (cityA > cityB) {
      return 1;
    }
  });
  return addresses;
}

export function sortByCityDescending() {
  const addresses = AddressService.getAddresses();
  addresses.sort(function (a, b) {
    const cityA = a.city.toUpperCase();
    const cityB = b.city.toUpperCase();
    if (cityA > cityB) {
      return -1;
    }
    if (cityA < cityB) {
      return 1;
    }

    return 0;
  });

  return addresses;
}

export function sortByNeighborhoodAscending() {
  const addresses = AddressService.getAddresses();
  addresses.sort(function (a, b) {
    var neighborhoodA = a.neighborhood.toUpperCase();
    var neighborhoodB = b.neighborhood.toUpperCase();

    if (neighborhoodA < neighborhoodB) {
      return -1;
    }
    if (neighborhoodA > neighborhoodB) {
      return 1;
    }
  });
  return addresses;
}

export function sortByNeighborhoodDescending() {
  const addresses = AddressService.getAddresses();
  addresses.sort(function (a, b) {
    const neighborhoodA = a.neighborhood.toUpperCase();
    const neighborhoodB = b.neighborhood.toUpperCase();
    if (neighborhoodA > neighborhoodB) {
      return -1;
    }
    if (neighborhoodA < neighborhoodB) {
      return 1;
    }

    return 0;
  });

  return addresses;
}

export function sortByStateAscending() {
  const addresses = AddressService.getAddresses();
  addresses.sort(function (a, b) {
    var stateA = a.state.toUpperCase();
    var stateB = b.state.toUpperCase();

    if (stateA < stateB) {
      return -1;
    }
    if (stateA > stateB) {
      return 1;
    }
  });
  return addresses;
}

export function sortByStateDescending() {
  const addresses = AddressService.getAddresses();
  addresses.sort(function (a, b) {
    const stateA = a.state.toUpperCase();
    const stateB = b.state.toUpperCase();
    if (stateA > stateB) {
      return -1;
    }
    if (stateA < stateB) {
      return 1;
    }

    return 0;
  });

  return addresses;
}
