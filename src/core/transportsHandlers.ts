import { Transport } from './../interfaces/transport.interface';

const Transports = require("../db/models/Transports");

export const createNewTransport = (transport: Transport) => {
    let newTransport = new Transports(transport);
    return newTransport.save();
}

export const getTransports = (): Transport[] => {
    console.log(Transports);
    return Transports.find()
};