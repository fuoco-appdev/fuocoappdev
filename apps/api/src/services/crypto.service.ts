import { Service } from 'https://deno.land/x/di@v0.1.1/mod.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import { crypto } from 'jsr:@std/crypto@^0.224.0';

@Service()
export default class CryptoService {
  private readonly _textEncoder: TextEncoder;
  private readonly _textDecoder: TextDecoder;
  private _encryptionKey: string;
  private _iv: string;

  constructor() {
    this._encryptionKey = Deno.env.get('CRYPTO_ENCRYPTION_KEY') ?? '';
    this._iv = Deno.env.get('CRYPTO_IV') ?? '';
    this._textEncoder = new TextEncoder();
    this._textDecoder = new TextDecoder();

    if (!this._encryptionKey) {
      throw new Error("CRYPTO_ENCRYPTION_KEY doesn't exist");
    }

    if (!this._iv) {
      throw new Error("CRYPTO_IV doesn't exist");
    }
  }

  public async encryptAsync(data: string): Promise<string | null> {
    const encryptionKeyHash = await crypto.subtle.digest(
      'SHA-256',
      this._textEncoder.encode(this._encryptionKey)
    );
    const iv = new Uint8Array(
      this._iv.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
    );
    const key: CryptoKey = await crypto.subtle.importKey(
      'raw',
      encryptionKeyHash,
      { name: 'AES-CBC' },
      true,
      ['decrypt', 'encrypt']
    );
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: iv,
      },
      key,
      this._textEncoder.encode(data)
    );
    const ctArray = Array.from(new Uint8Array(encrypted));
    const ctStr = ctArray.map((byte) => String.fromCharCode(byte)).join('');
    return btoa(ctStr);
  }

  public async decryptAsync(data: string): Promise<string> {
    const encryptedKeyHash = await crypto.subtle.digest(
      'SHA-256',
      this._textEncoder.encode(this._encryptionKey)
    );
    const iv = new Uint8Array(
      this._iv.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
    );
    const binaryString = atob(data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const key = await crypto.subtle.importKey(
      'raw',
      encryptedKeyHash,
      { name: 'AES-CBC' },
      true,
      ['decrypt', 'encrypt']
    );
    const decrypted = await crypto.subtle.decrypt(
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
