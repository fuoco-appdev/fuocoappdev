import axios from "axios";
import {
  DeepLTranslateRequest,
  DeepLTranslationsResponse,
} from "../protobuf/deepl_pb";
import { Service } from "../service";

class DeepLService extends Service {
  constructor() {
    super();
  }

  public async translateAsync(
    text: string,
    languageCode: string,
  ): Promise<DeepLTranslationsResponse> {
    const request = new DeepLTranslateRequest({
      text: text,
      languageCode: languageCode.toUpperCase(),
    });

    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/deepl/translate`,
      headers: {
        ...this.headers,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const translationsResponse = DeepLTranslationsResponse.fromBinary(
      arrayBuffer,
    );
    return translationsResponse;
  }
}

export default new DeepLService();
