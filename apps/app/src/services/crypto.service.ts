import { Service } from '../service';
const { subtle } = globalThis.crypto;

class CryptoService extends Service {
  private readonly _textEncoder: TextEncoder;
  private readonly _textDecoder: TextDecoder;
  private readonly _encryptionKey: string;
  private readonly _iv: string;

  constructor() {
    super();

    this._textEncoder = new TextEncoder();
    this._textDecoder = new TextDecoder();
    this._encryptionKey = import.meta.env['CRYPTO_ENCRYPTION_KEY'] ?? '';
    this._iv = import.meta.env['CRYPTO_IV'] ?? '';
  }

  public async encryptAsync(text: string): Promise<string> {
    const encryptionKey = await subtle.digest(
      'SHA-256',
      this._textEncoder.encode(this._encryptionKey)
    );
    const iv = new Uint8Array(
      this._iv.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
    );
    const key: CryptoKey = await subtle.importKey(
      'raw',
      encryptionKey,
      { name: 'AES-CBC' },
      true,
      ['encrypt', 'decrypt']
    );
    const encrypted = await subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: iv,
      },
      key,
      this._textEncoder.encode(text)
    );
    return this._textDecoder.decode(encrypted);
  }

  public async decryptAsync(text: string): Promise<string> {
    const encryptedKeyHash = await subtle.digest(
      'SHA-256',
      this._textEncoder.encode(this._encryptionKey)
    );
    const iv = new Uint8Array(
      this._iv.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
    );
    const binaryString = atob(text);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const key = await subtle.importKey(
      'raw',
      encryptedKeyHash,
      { name: 'AES-CBC' },
      true,
      ['decrypt', 'encrypt']
    );
    const decrypted = await subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: iv,
      },
      key,
      bytes.buffer
    );

    return this._textDecoder.decode(decrypted);
  }
}

export default new CryptoService();
