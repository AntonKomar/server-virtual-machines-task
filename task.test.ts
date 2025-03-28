import { VM } from "./models/VM";
import { allocateVMs, clearCompanyServers, getCompanyServers } from "./services/ITCompanyService";
import { clearSoldServers, getSoldServers, setDefaultServer } from "./services/ShopService";


describe('ServerCompany', () => {
  describe('allocateVMs', () => {

        beforeEach(() => {
            clearSoldServers();
            clearCompanyServers();
        });

        test('allocates VMs correctly', () => {
            const vms = [
                { id: 1, cpu: 2, ram: 8, bandwidth: 100 },
                { id: 2, cpu: 8, ram: 32, bandwidth: 500 },
            ];
            const defaultServer = {
                id: 1,
                cpu: 8,
                ram: 32,
                bandwidth: 2000
            };
            setDefaultServer(defaultServer);


            const result = allocateVMs(vms);


            const companyServers = getCompanyServers();
            const soldServers = getSoldServers();
            expect(result).toBe(true);
            expect(soldServers.length).toBe(2);
            expect(companyServers.length).toBe(2);
            expect(companyServers[0].vms).toHaveLength(1);
            expect(companyServers[1].vms).toHaveLength(1);
        });

        test('allocate VMs that exceed server capacity', () => {
            const vms = [
                { id: 1, cpu: 2, ram: 8, bandwidth: 100 },
                { id: 2, cpu: 8, ram: 32, bandwidth: 500 },
                { id: 3, cpu: 4, ram: 16, bandwidth: 200 },
            ];
            const defaultServer = {
                id: 1,
                cpu: 8,
                ram: 21,
                bandwidth: 2000
            };
            setDefaultServer(defaultServer);


            const result = allocateVMs(vms);


            const companyServers = getCompanyServers();
            const soldServers = getSoldServers();
            expect(result).toBe(false);
            expect(soldServers.length).toBe(1);
            expect(companyServers.length).toBe(1);
            expect(companyServers[0].vms).toHaveLength(1);
        });

        test('allocate VMs with no available servers', () => {
            const vms: VM[] = [];
            const defaultServer = {
                id: 1,
                cpu: 8,
                ram: 32,
                bandwidth: 2000
            };
            setDefaultServer(defaultServer);


            const result = allocateVMs(vms);

            const companyServers = getCompanyServers();
            const soldServers = getSoldServers();
            expect(result).toBe(true);
            expect(soldServers.length).toBe(0);
            expect(companyServers.length).toBe(0);
        })
    });
})