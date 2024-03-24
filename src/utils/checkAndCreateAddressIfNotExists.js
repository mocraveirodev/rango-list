import AddressRepository from '../repositories/addresses/AddressRepository.js';


export async function checkAndCreateAddressIfNotExists(address) {
    const addressRepository = new AddressRepository();
    const existAddress = await addressRepository.findAddress(address);

    if (!existAddress) {
        return await addressRepository.create(address);
    }

    return existAddress;
}
