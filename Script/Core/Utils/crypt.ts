namespace game.crypt {
    export let key: CryptoKey;
    
    export async function init() {
        key = await generateKey();
    }

    export async function en(message:string): Promise<Cryptid> {
        return await encryptMessage(message);
    }

    export async function de(data: Cryptid): Promise<string>{
        return await decryptMessage(data.encryptedData, data.iv);
    }

    // Function to generate a random encryption key
    async function generateKey() {
        return await window.crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256,
            },
            true,
            ["encrypt", "decrypt"]
        );
    }

    // Function to encrypt a string
    async function encryptMessage(message: string) {
        const encodedMessage = new TextEncoder().encode(message);
        const iv = window.crypto.getRandomValues(new Uint8Array(12));

        const encryptedBuffer = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            key,
            encodedMessage
        );

        const encryptedArray = new Uint8Array(encryptedBuffer);

        return {
            iv: iv,
            encryptedData: encryptedArray,
        };
    }

    // Function to decrypt an encrypted message
    async function decryptMessage(encryptedData: Uint8Array, iv: Uint8Array) {
        const decryptedBuffer = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            key,
            encryptedData
        );

        return new TextDecoder().decode(decryptedBuffer);
    }
}