import { hasServerSpace, Server } from "../models/Server";
import { VM } from "../models/VM";
import { buyServer, getDefaultServer } from "./ShopService";

let companyServers: Server[] = [];

export const allocateVMs = (vms: VM[]): boolean => {
    let result = true;

    vms?.forEach(vm => {
        if(result === false) {
            return false;
        }

        const server = companyServers.find(server => hasServerSpace(server, vm));
        if(server) {
            server.vms = server.vms || [];
            server.vms.push(vm);

            result = true;
        } else {
            if(hasServerSpace(getDefaultServer(), vm)) {
                const newServer = buyServer();
                newServer.vms = [];
                companyServers.push(newServer);
                newServer.vms = [vm];

                result = true;
            } else {
                console.log(`No server space available for VM with ID: ${vm.id}`);

                result = false;
            }
        }
    });

    return result;
}

export const showCompanyServers = () => {
    companyServers.forEach(server => {
        console.log(`Server ID: ${server.id}`);
        console.log(`CPU: ${server.cpu}`);
        console.log(`RAM: ${server.ram}`);
        console.log(`Bandwidth: ${server.bandwidth}`);
        console.log(`VMs:\n ${server.vms?.map(vm => 
            `---VM ID: ${vm.id}, CPU: ${vm.cpu}, RAM: ${vm.ram}, Bandwidth: ${vm.bandwidth}`).join(",\n")}`);
        console.log("\n-----------------------------------\n");
    });
}

export const getCompanyServers = () => {
    return companyServers;
}

export const clearCompanyServers = () => {
    companyServers = [];
}