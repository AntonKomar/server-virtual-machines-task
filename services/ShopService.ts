import { Server, serverDefaults } from "../models/Server";

let soldServers: Server[] = [];

let defaultServer: Server = {
    ...serverDefaults,
}

export const buyServer = (): Server => {
    const newServer = {
        ...defaultServer,
        id: soldServers.length + 1
    }
    soldServers.push(newServer);
    return newServer;
}

export const setDefaultServer = (server: Server) => {
    defaultServer = server;
}

export const getDefaultServer = () => {
    return defaultServer;
}

export const getSoldServers = () => {
    return soldServers;
}

export const clearSoldServers = () => {
    soldServers = [];
}
