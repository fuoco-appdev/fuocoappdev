import * as crypto from 'crypto';
import { Service } from "../service";

class CryptoService extends Service {
    private readonly _algorithm = 'aes-256-cbc';
    private readonly _encryptionKey: Uint8Array;
    private readonly _iv: Uint8Array;

    constructor() {
        super();

        this._encryptionKey = Buffer.from(process.env["CRYPTO_ENCRYPTION_KEY"] ?? '');
        this._iv = Buffer.from(process.env["CRYPTO_IV"] ?? '');
    }

    public encrypt(text: string): string {
        const cipher = crypto.createCipheriv(this._algorithm, this._encryptionKey, this._iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }

    public decrypt(text: string): string {
        const encryptedText = Buffer.from(text, 'hex');
        const decipher = crypto.createDecipheriv(this._algorithm, this._encryptionKey, this._iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}

export default new CryptoService();
