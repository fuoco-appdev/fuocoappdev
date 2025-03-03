import CryptoJS from 'crypto-js';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import LogflareService from './logflare.service';

export default class CryptoService extends Service {
  private readonly _textEncoder: TextEncoder;
  private readonly _textDecoder: TextDecoder;

  constructor(
    private readonly _encryptionKey: string,
    private readonly _iv: string,
    private readonly _configService: ConfigService,
    private readonly _logflareService: LogflareService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);

    this._textEncoder = new TextEncoder();
    this._textDecoder = new TextDecoder();
  }

  public override dispose(): void {}

  public async encryptAsync(text: string): Promise<string> {
    // Hash the encryption key using SHA-256
    const hashedKey = CryptoJS.SHA256(this._encryptionKey).toString(
      CryptoJS.enc.Hex
    );

    // Convert IV from hex string to a WordArray
    const iv = CryptoJS.enc.Hex.parse(this._iv);

    // Convert hashed key to WordArray
    const key = CryptoJS.enc.Hex.parse(hashedKey);

    // Encrypt the text
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Return the ciphertext as a Base64 string
    return encrypted.toString();
  }

  public async decryptAsync(text: string): Promise<string> {
    // Hash the encryption key using SHA-256
    const hashedKey = CryptoJS.SHA256(this._encryptionKey).toString(
      CryptoJS.enc.Hex
    );

    // Convert IV from hex string to a WordArray
    const iv = CryptoJS.enc.Hex.parse(this._iv);

    // Convert hashed key to WordArray
    const key = CryptoJS.enc.Hex.parse(hashedKey);

    // Decrypt the text
    const decrypted = CryptoJS.AES.decrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Convert the decrypted WordArray to a UTF-8 string
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
