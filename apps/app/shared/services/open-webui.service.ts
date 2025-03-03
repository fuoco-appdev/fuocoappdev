import { EventSourceMessage } from 'eventsource-parser';
import { EventSourceParserStream } from 'eventsource-parser/stream';
import { makeObservable, observable, runInAction } from 'mobx';
import { io, Socket } from 'socket.io-client';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import LogflareService from './logflare.service';

export interface OpenWebuiUser {
  email?: string;
  id?: string;
  name?: string;
  profile_image_url?: string;
  role?: string;
  token?: string;
  token_type?: string;
  expires_at?: string;
  permissions?: Record<string, unknown>;
}

export interface OpenWebuiAdminConfigResponse {
  status?: boolean;
  name?: string;
  version?: string;
  default_locale?: string;
  oauth?: {
    providers: {
      name?: string;
      [key: string]: unknown;
    };
  };
  features?: {
    auth?: boolean;
    auth_trusted_header?: boolean;
    enable_ldap?: unknown;
    enable_api_key?: unknown;
    enable_signup?: unknown;
    enable_login_form?: unknown;
    enable_web_search?: unknown;
    enable_image_generation?: unknown;
    enable_community_sharing?: unknown;
    enable_message_rating?: unknown;
    enable_admin_export?: boolean;
    enable_admin_chat_access?: boolean;
    [key: string]: unknown;
  };
  default_models?: unknown;
  default_prompt_suggestions?: unknown;
  audio?: {
    tts?: {
      engine?: unknown;
      voice?: unknown;
      split_on?: unknown;
    };
    stt?: {
      engine?: unknown;
    };
  };
  file?: {
    max_size?: unknown;
    max_count?: unknown;
  };
  permissions?: {
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface OpenWebuiChatHistory {
  messages: Record<string, OpenWebuiMessage>;
  currentId: string | null;
}

export interface OpenWebuiChatRequest {
  id?: string;
  title?: string;
  models?: string[];
  system?: string;
  params?: Record<string, unknown>;
  history?: OpenWebuiChatHistory;
  messages?: OpenWebuiMessage[];
  tags?: string[];
  timestamp?: number;
}

export interface OpenWebuiMessage {
  id?: string;
  parentId?: string | null;
  childrenIds?: string[];
  role?: string;
  statusHistory?: {
    done: boolean;
    action: string;
    description: string;
    urls?: string[];
    query?: string;
  }[];
  status?: {
    done: boolean;
    action: string;
    description: string;
    urls?: string[];
    query?: string;
  };
  code_executions?: {
    uuid: string;
    name: string;
    code: string;
    language?: string;
    result?: {
      error?: string;
      output?: string;
      files?: { name: string; url: string }[];
    };
  }[];
  info?: {
    openai?: boolean;
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    sample_count?: number;
    sample_duration?: number;
    eval_count?: number;
    eval_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    total_duration?: number;
    load_duration?: number;
    usage?: unknown;
  };
  context?: unknown;
  annotation?: { type: string; rating: number };
  error?: boolean | { code?: number; content: string };
  content?: string;
  lastSentence?: string;
  timestamp?: number;
  models?: string[];
  done?: boolean;
  model?: string;
  modelName?: string;
  modelIdx?: number;
  files?: { type: string; url: string }[];
  images?: unknown[];
  sources?: string[];
  userContext?: unknown | null;
  merged?: Record<string, unknown>;
}

export interface OpenWebuiChatResponse {
  id: string;
  user_id: string;
  title: string;
  archived: boolean;
  chat: Record<string, unknown>;
  updated_at: number;
  created_at: number;
  share_id?: string;
  pinned?: boolean;
  meta: Record<string, unknown>;
  folder_id?: string;
}

export interface OpenWebuiModelResponse {
  id: string;
  name: string;
  object: string;
  created: number;
  owned_by: string;
  info: unknown;
  ollama: unknown;
  preset: boolean;
  pipe: unknown;
  action_ids: string[];
}

export interface OpenWebuiUserSettingsResponse {
  ui: Record<string, unknown>;
  model_config: Record<string, unknown>;
}

export interface OpenWebuiChatCompletedRequest {
  id: string;
  model: string;
  messages: OpenWebuiMessage[];
  chat_id: string;
  session_id: string;
}

export interface OpenWebuiResponseUsage {
  /** Including images and tools if unknown */
  prompt_tokens: number;
  /** The tokens generated */
  completion_tokens: number;
  /** Sum of the above two fields */
  total_tokens: number;
  /** unknown other fields that aren't part of the base OpenAI spec */
  [other: string]: unknown;
}

export interface OpenWebuiTextStreamUpdate {
  done: boolean;
  value: string;
  sources?: unknown;
  selectedModelId?: unknown;
  error?: unknown;
  usage?: OpenWebuiResponseUsage;
}

export interface ChatCompletionRequestInfo {
  url: string;
  request: object;
  abortController: AbortController;
}

export default class OpenWebuiService extends Service {
  @observable
  public socket!: Socket | undefined;

  private readonly _webuiApiUrl: string;

  constructor(
    private readonly _apiToken: string,
    private readonly _configService: ConfigService,
    private readonly _logflareService: LogflareService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
    makeObservable(this);

    this._webuiApiUrl = this._configService.openWebui.url;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public override dispose(): void {}

  public openSocket(token: string): void {
    if (this.socket && this.socket.active) {
      return;
    }

    runInAction(() => {
      this.socket = io(this._webuiApiUrl, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
        path: '/ws/socket.io',
        auth: { token: token },
      });
    });
  }

  public closeSocket(): void {
    this.socket?.disconnect();
  }

  public override async requestHealthAsync(
    retries = 1,
    retryDelay = 1000
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${this._configService.openWebui.url}/health`
      );
      return response.status === 200;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestHealthAsync(retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        return false;
      }
    }
  }

  public async requestChatCompleted(
    body: OpenWebuiChatCompletedRequest,
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<unknown> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/chat/completed`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then(async (response) => {
          if (!response.ok) throw await response.json();
          return response.json();
        })
        .catch((err) => {
          console.error(err);
          if ('detail' in err) {
            error = err.detail;
          } else {
            error = err;
          }
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestChatCompleted(body, token, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestGetUserByIdAsync(
    userId: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiUser> {
    try {
      let error = null;

      const response = await fetch(
        `${this._webuiApiUrl}/api/v1/users/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this._apiToken}`,
          },
        }
      )
        .then(async (value) => {
          if (!value.ok) throw await value.json();
          return value.json();
        })
        .catch((err) => {
          console.error(err);
          error = err.detail;
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestGetUserByIdAsync(userId, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestSigninAsync(
    email: string,
    password: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiUser> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/v1/auths/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(async (value) => {
          if (!value.ok) throw await value.json();
          return value.json();
        })
        .catch((err) => {
          console.error(err);

          error = err.detail;
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestSigninAsync(
          email,
          password,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestSignupAsync(
    name: string,
    email: string,
    password: string,
    profile_image_url = '',
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiUser> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/v1/auths/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          profile_image_url: profile_image_url,
        }),
      })
        .then(async (value) => {
          if (!value.ok) throw await value.json();
          return value.json();
        })
        .catch((err) => {
          console.error(err);
          error = err.detail;
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestSignupAsync(
          name,
          email,
          password,
          profile_image_url,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestQueryMemory(
    content: string,
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<Record<string, unknown>> {
    try {
      let error = null;

      const response = await fetch(
        `${this._webuiApiUrl}/api/v1/memories/query`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: content,
          }),
        }
      )
        .then(async (response) => {
          if (!response.ok) throw await response.json();
          return response.json();
        })
        .catch((err) => {
          error = err.detail;
          console.error(err);
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestQueryMemory(content, token, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestModelsAsync(
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiModelResponse[]> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/models`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
        .then(async (response) => {
          if (!response.ok) throw await response.json();
          return response.json();
        })
        .then((json) => {
          return json;
        })
        .catch((err) => {
          error = err;
          console.error(err);
          return null;
        });

      if (error) {
        throw error;
      }

      return response['data'];
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestModelsAsync(token, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestAdminConfigAsync(
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiAdminConfigResponse> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/config`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (response) => {
          if (!response.ok) throw await response.json();
          return response.json();
        })
        .catch((err) => {
          console.error(err);
          error = err;
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestAdminConfigAsync(retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestUserSettingsAsync(
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiUserSettingsResponse> {
    try {
      let error = null;
      const response = await fetch(
        `${this._webuiApiUrl}/api/v1/users/user/settings`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(async (response) => {
          if (!response.ok) throw await response.json();
          return response.json();
        })
        .catch((err) => {
          console.error(err);
          error = err.detail;
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestUserSettingsAsync(token, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestUpdateUserLocation(
    coordinates: { latitude: number; longitude: number },
    token: string
  ): Promise<unknown> {
    const formattedLocation = `${coordinates.latitude.toFixed(
      3
    )}, ${coordinates.longitude.toFixed(3)} (lat, long)`;
    return await this.requestUpdateUserInfo(
      { location: formattedLocation },
      token
    );
  }

  public async requestUpdateUserInfo(
    info: Record<string, unknown>,
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<Record<string, unknown>> {
    try {
      let error = null;

      const response = await fetch(
        `${this._webuiApiUrl}/api/v1/users/user/info/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...info,
          }),
        }
      )
        .then(async (response) => {
          if (!response.ok) throw await response.json();
          return response.json();
        })
        .catch((err) => {
          console.error(err);
          error = err.detail;
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestUpdateUserInfo(info, token, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestAddUserAsync(
    name: string,
    email: string,
    password: string,
    role = 'user',
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiUser> {
    try {
      let error = null;
      const response = await fetch(`${this._webuiApiUrl}/api/v1/auths/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${this._apiToken}`,
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role,
        }),
      })
        .then(async (value) => {
          if (!value.ok) throw await value.json();
          return value.json();
        })
        .catch((err) => {
          console.error(err);
          error = err.detail;
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestAddUserAsync(
          name,
          email,
          password,
          role,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestCreateNewChat(
    chat: OpenWebuiChatRequest,
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiChatResponse> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/v1/chats/new`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chat: chat,
        }),
      })
        .then(async (value) => {
          if (!value.ok) throw await value.json();
          return value.json();
        })
        .catch((err) => {
          error = err;
          console.error(err);
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestCreateNewChat(chat, token, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestGetChatListByUserId(
    userId: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiChatResponse[]> {
    try {
      let error = null;

      const response = await fetch(
        `${this._webuiApiUrl}/api/v1/chats/list/user/${userId}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${this._apiToken}`,
          },
        }
      )
        .then(async (response) => {
          if (!response.ok) throw await response.json();
          return response.json();
        })
        .then((json) => {
          return json;
        })
        .catch((err) => {
          error = err;
          console.error(err);
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestGetChatListByUserId(userId, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestGetChatById(
    id: string,
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiChatResponse> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/v1/chats/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
        .then(async (value) => {
          if (!value.ok) throw await value.json();
          return value.json();
        })
        .then((json) => {
          return json;
        })
        .catch((err) => {
          error = err;

          console.error(err);
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestGetChatById(id, token, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestUpdateChatById(
    id: string,
    chat: object,
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiChatResponse> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/v1/chats/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chat: chat,
        }),
      })
        .then(async (value) => {
          if (!value.ok) throw await value.json();
          return value.json();
        })
        .then((json) => {
          return json;
        })
        .catch((err) => {
          error = err;

          console.error(err);
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestUpdateChatById(
          id,
          chat,
          token,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestDeleteChatById(
    id: string,
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<OpenWebuiChatResponse> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/v1/chats/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
        .then(async (value) => {
          if (!value.ok) throw await value.json();
          return value.json();
        })
        .then((json) => {
          return json;
        })
        .catch((err) => {
          error = err.detail;

          console.error(err);
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestDeleteChatById(id, token, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public getChatCompletionRequestInfo(
    body: object,
    token: string
  ): ChatCompletionRequestInfo {
    const controller = new AbortController();
    return {
      url: `${this._webuiApiUrl}/ollama/v1/chat/completions`,
      request: {
        signal: controller.signal,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify(body),
        pollingInterval: 0,
      },
      abortController: controller,
    };
  }

  public async requestChatCompletionAsync(
    body: object,
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<Response | null> {
    try {
      let error = null;
      const controller = new AbortController();
      const response = await fetch(
        `${this._webuiApiUrl}/ollama/v1/chat/completions`,
        {
          signal: controller.signal,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      ).catch((err) => {
        console.error(err);
        error = err;
        return null;
      });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestChatCompletionAsync(
          body,
          token,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestTextStreamAsync(
    responseBody: ReadableStream<Uint8Array>,
    splitLargeDeltas: boolean
  ): Promise<AsyncGenerator<OpenWebuiTextStreamUpdate>> {
    const eventStream = responseBody
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new EventSourceParserStream())
      .getReader();

    let iterator = this.streamToIteratorAsync(eventStream);
    if (splitLargeDeltas) {
      iterator = this.streamLargeDeltasAsRandomChunksAsync(iterator);
    }

    return iterator;
  }

  public async requestSynthesisSpeechAsync(
    text: string,
    token: string,
    speaker = 'alloy',
    model = 'tts-1',
    retries = 3,
    retryDelay = 1000
  ): Promise<Response | null> {
    try {
      let error = null;

      const response = await fetch(`${this._webuiApiUrl}/api/v1/audio/speech`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          input: text,
          voice: speaker,
        }),
      }).catch((err) => {
        console.error(err);
        error = err;
        return null;
      });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestSynthesisSpeechAsync(
          text,
          token,
          speaker,
          model,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  public async requestTranscribeAudioAsync(
    file: {
      uri: string;
      type: string;
      name: string;
    },
    token: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<Record<string, string>> {
    try {
      const data = new FormData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.append('file', file as any);

      let error = null;
      const response = await fetch(
        `${this._webuiApiUrl}/api/v1/audio/transcriptions`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: data,
        }
      )
        .then(async (value) => {
          if (!value.ok) throw await value.json();
          return value.json();
        })
        .catch((err) => {
          error = err.detail;
          console.error(err);
          return null;
        });

      if (error) {
        throw error;
      }

      return response;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestTranscribeAudioAsync(
          file,
          token,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
          },
        });
        throw error;
      }
    }
  }

  private async *streamLargeDeltasAsRandomChunksAsync(
    iterator: AsyncGenerator<OpenWebuiTextStreamUpdate>
  ): AsyncGenerator<OpenWebuiTextStreamUpdate> {
    for await (const textStreamUpdate of iterator) {
      if (textStreamUpdate.done) {
        yield textStreamUpdate;
        return;
      }
      if (textStreamUpdate.sources) {
        yield textStreamUpdate;
        continue;
      }
      let content = textStreamUpdate.value;
      if (content.length < 5) {
        yield { done: false, value: content };
        continue;
      }
      while (content !== '') {
        const chunkSize = Math.min(
          Math.floor(Math.random() * 3) + 1,
          content.length
        );
        const chunk = content.slice(0, chunkSize);
        yield { done: false, value: chunk };
        // Do not sleep if the tab is hidden
        // Timers are throttled to 1s in hidden tabs
        if (document?.visibilityState !== 'hidden') {
          await this.sleep(5);
        }
        content = content.slice(chunkSize);
      }
    }
  }

  private async *streamToIteratorAsync(
    reader: ReadableStreamDefaultReader<EventSourceMessage>
  ): AsyncGenerator<OpenWebuiTextStreamUpdate> {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        yield { done: true, value: '' };
        break;
      }
      if (!value) {
        continue;
      }
      const data = value.data;
      if (data.startsWith('[DONE]')) {
        yield { done: true, value: '' };
        break;
      }

      try {
        const parsedData = JSON.parse(data);
        if (parsedData.error) {
          yield { done: true, value: '', error: parsedData.error };
          break;
        }

        if (parsedData.sources) {
          yield { done: false, value: '', sources: parsedData.sources };
          continue;
        }

        if (parsedData.selected_model_id) {
          yield {
            done: false,
            value: '',
            selectedModelId: parsedData.selected_model_id,
          };
          continue;
        }

        yield {
          done: false,
          value: parsedData.choices?.[0]?.delta?.content ?? '',
          usage: parsedData.usage,
        };
      } catch (e) {
        console.error('Error extracting delta from SSE event:', e);
      }
    }
  }

  private sleep(ms: number): Promise<NodeJS.Timeout> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
