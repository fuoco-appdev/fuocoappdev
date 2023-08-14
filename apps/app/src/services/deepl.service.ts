import axios, { AxiosError } from 'axios';

export interface Translation {
  detected_source_language: string;
  text: string;
}

class DeepLService {
  private _authKey: string | undefined;

  constructor() {}

  public initializeDeepL(authKey: string): void {
    this._authKey = authKey;
  }

  public async translateAsync(
    text: string,
    languageCode: string
  ): Promise<Translation[]> {
    const response = await axios({
      method: 'post',
      url: `https://api-free.deepl.com/v2/translate`,
      headers: {
        Authorization: `DeepL-Auth-Key ${this._authKey}`,
      },
      data: {
        text: text,
        target_lang: languageCode.toUpperCase(),
      },
      responseType: 'json',
    });

    const translations = response.data['translations'] as Translation[];
    return translations;
  }
}

export default new DeepLService();
