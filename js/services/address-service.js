import * as requestService from "./request-service.js";
import Address from "../models/address.js";

const addresses = [];

export async function findByCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const result = await requestService.getJson(url);

  const address = new Address(
    result.cep,
    result.bairro,
    result.localidade,
    result.uf
  );

  addresses.push(address);

  return address;
}

export function getAddresses() {
  return addresses;
}

export function getErrors(address) {
  const errors = {};

  if (!address.cep || address.cep == "") {
    errors.cep = "Campo requerido";
  }

  return errors;
}
