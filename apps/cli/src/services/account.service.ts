import { Service } from "../service";
import {
  AccountResponse,
  AccountsRequest,
  AccountsResponse,
} from "../protobuf/account_pb";
import { BehaviorSubject, Observable } from "rxjs";
import SupabaseService from "./supabase.service";
import axios, { AxiosError } from "axios";
import { Session, User } from "@supabase/supabase-js";

class AccountService extends Service {
  private _activeAccount: AccountResponse | undefined;
  constructor() {
    super();
  }

  public get activeAccount(): AccountResponse | undefined {
    return this._activeAccount;
  }

  public async requestActiveAsync(
    session: Session,
  ): Promise<AccountResponse> {
    const account = await this.requestAsync(session, session.user.id);
    this._activeAccount = account;
    return account;
  }

  public async requestAsync(
    session: Session,
    supabaseId: string,
  ): Promise<AccountResponse> {
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account/${supabaseId}`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: "",
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountResponse = AccountResponse.fromBinary(arrayBuffer);
    return accountResponse;
  }

  public async requestAccountsAsync(
    accountIds: string[],
  ): Promise<AccountsResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new AccountsRequest({
      accountIds: accountIds,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account/accounts`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountsResponse = AccountsResponse.fromBinary(arrayBuffer);
    return accountsResponse;
  }
}

export default new AccountService();
