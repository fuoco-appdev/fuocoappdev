import Ajv, { JSONSchemaType, ValidateFunction } from "ajv";
import fs from "fs";

export interface Config {
  supabase: SupabaseConfig;
  medusa: MedusaConfig;
}

export interface SupabaseConfig {
  url: string;
  functions_url: string;
  anon_key: string;
}

export interface MedusaConfig {
  url: string;
  public_key: string;
}

class ConfigService {
  private readonly _ajv: Ajv;
  private readonly _schema: JSONSchemaType<Config>;

  constructor() {
    this._ajv = new Ajv();
    this._schema = {
      type: "object",
      properties: {
        supabase: {
          type: "object",
          required: ["url", "functions_url", "anon_key"],
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              functions_url: { type: "string" },
              anon_key: { type: "string" },
            },
          },
        },
        medusa: {
          type: "object",
          required: ["url", "public_key"],
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              public_key: { type: "string" },
            },
          },
        },
      },
      required: [
        "supabase",
        "medusa",
      ],
      additionalProperties: false,
    };
  }

  public async getConfigAsync(): Promise<Config | null> {
    const files: string[] = await this.readDirAsync();
    const configFile = files.find((value) =>
      value.startsWith(process.env["NODE_ENV"] ?? "development")
    );
    if (!configFile) {
      return null;
    }
    const config = await this.readFileAsync(configFile);
    return config;
  }

  private async readDirAsync(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      fs.readdir("./dist/apps/cli/assets/configs", (error, files) => {
        const configs: string[] = [];
        if (error) {
          reject(error);
        }

        files.map((file) => {
          configs.push(file);
        });
        resolve(configs);
      });
    });
  }

  private async readFileAsync(path: string): Promise<Config> {
    return new Promise<Config>((resolve, reject) => {
      fs.readFile(`./dist/apps/cli/assets/configs/${path}`, (error, data) => {
        if (error) {
          reject(error);
        }

        const object: object = JSON.parse(data.toString());
        const validate = this._ajv.compile(this._schema);
        if (validate(object)) {
          resolve(object as Config);
        } else {
          reject(validate.errors);
        }
      });
    });
  }
}

export default new ConfigService();
