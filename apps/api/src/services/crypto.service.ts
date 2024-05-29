import { Aes } from "https://deno.land/x/crypto/aes.ts";
import { Cbc, Padding } from "https://deno.land/x/crypto/block-modes.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

class CryptoService {
    private readonly _textEncoder: TextEncoder;
    private readonly _textDecoder: TextDecoder;
    private _encryptionKey: string | undefined;
    private _iv: string | undefined;

    constructor() {
        this._encryptionKey = Deno.env.get("CRYPTO_ENCRYPTION_KEY");
        this._iv = Deno.env.get("CRYPTO_IV");
        this._textEncoder = new TextEncoder();
        this._textDecoder = new TextDecoder();

        if (!this._encryptionKey) {
            throw new Error("CRYPTO_ENCRYPTION_KEY doesn't exist");
        }

        if (!this._iv) {
            throw new Error("CRYPTO_IV doesn't exist");
        }
    }

    public encrypt(data: string): string {
        const cipher = new Cbc(Aes, this._textEncoder.encode(this._encryptionKey), this._textEncoder.encode(this._iv), Padding.PKCS7);
        const encrypted = cipher.encrypt(this._textEncoder.encode(data));
        return this._textDecoder.decode(encrypted);
    }

    public decrypt(data: string): string {
        const encryptedText = this._textEncoder.encode(data);
        const decipher = new Cbc(Aes, this._textEncoder.encode(this._encryptionKey), this._textEncoder.encode(this._iv), Padding.PKCS7);
        const decrypted = decipher.decrypt(encryptedText);
        return this._textDecoder.decode(decrypted);
    }
}

export default new CryptoService();
