import { VM } from "./VM";

export type Server = {
    id: number;
    cpu: number;
    ram: number;
    bandwidth: number;
    vms?: VM[];
}

export const serverDefaults: Server = {
    id: 1,
    cpu: 8,
    ram: 32,
    bandwidth: 1000
}

export const hasServerSpace = (server: Server, vm: VM) => {
    const cpuSpace = server.cpu - (server.vms?.reduce((acc, vm) => acc + vm.cpu, 0) || 0);
    const ramSpace = server.ram - (server.vms?.reduce((acc, vm) => acc + vm.ram, 0) || 0);
    const bandwidthSpace = server.bandwidth - (server.vms?.reduce((acc, vm) => acc + vm.bandwidth, 0) || 0);
    return cpuSpace >= vm.cpu && ramSpace >= vm.ram && bandwidthSpace >= vm.bandwidth;
}



