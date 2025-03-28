import { VM } from "./models/VM";
import { allocateVMs, showCompanyServers } from "./services/ITCompanyService";
import { setDefaultServer } from "./services/ShopService";

function main() {
  const vms: VM[] = [
    { id: 1, cpu: 2, ram: 2, bandwidth: 2 },
    { id: 2, cpu: 2, ram: 2, bandwidth: 2 },
    { id: 3, cpu: 1, ram: 1, bandwidth: 1 },
    { id: 4, cpu: 1, ram: 1, bandwidth: 1 },
  ];
  const defaultServer = {
      id: 1,
      cpu: 1,
      ram: 1,
      bandwidth: 1
  };
  setDefaultServer(defaultServer);

  const result = allocateVMs(vms);

  console.log(`Result: ${result}`);
  showCompanyServers();
}

main();