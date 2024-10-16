namespace game {
    export interface Cryptid {
        encryptedData: Uint8Array, 
        iv: Uint8Array
    }
}