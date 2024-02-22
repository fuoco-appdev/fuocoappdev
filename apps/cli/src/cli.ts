import { Router } from "express";
import SupabaseService from "./services/supabase.service";
import ConfigService from "./services/config.service";
import cookie from "cookie";
import { AuthChangeEvent, Session, Subscription } from "@supabase/supabase-js";
import ESCPOSService from "./services/escpos.service";
import AccountService from "./services/account.service";
import { AccountResponse, CreateDeviceRequest } from "./protobuf/core_pb";
import MedusaService from "./services/medusa.service";
import { StockLocation } from "@medusajs/stock-location/dist/models";
import { Printer } from "escpos";
import LoginController from "./controllers/login.controller";
import ESCPOSController from "./controllers/escpos.controller";
import DeviceService from "./services/device.service";

export enum PromptNavigation {
  GoBack = "Go back",
}

export enum PromptOptionType {
  RegisterESCPOSDevice = "Register ESCPOS device",
  ConnectESCPOSDevice = "Connect ESCPOS device",
  UpdateESCPOSDevice = "Update ESCPOS device",
}

export class CLI {
  private _authSubscription: Subscription | undefined;
  constructor() {
    this.onAuthStateChangedAsync = this.onAuthStateChangedAsync.bind(this);
  }

  public registerRouter(router: Router): void {
    router.get("*", async (req, res) => {
      const cookieRecord = cookie.parse(req.headers.cookie ?? "");
      if (
        Object.keys(cookieRecord).includes("sb-access-token") &&
        Object.keys(cookieRecord).includes("sb-refresh-token")
      ) {
        const accessToken = cookieRecord?.["sb-access-token"];
        const refreshToken = cookieRecord?.["sb-refresh-token"];
        await SupabaseService.setSessionAsync(accessToken, refreshToken);
      }
    });
  }

  public async initializeAsync(): Promise<void> {
    try {
      const config = await ConfigService.getConfigAsync();
      if (!config) {
        return;
      }

      SupabaseService.initialize(config);
      AccountService.initialize(config);
      MedusaService.initialize(config);
      DeviceService.initialize(config);
    } catch (error: any) {
      console.error(error);
      return;
    }

    await LoginController.promptLoginAsync();
    this._authSubscription = SupabaseService.subscribeToAuthStateChanged(
      this.onAuthStateChangedAsync,
    );
  }

  public async disposeAsync(): Promise<void> {
    this._authSubscription?.unsubscribe();
  }

  private async promptOptionsAsync(account: AccountResponse): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "list",
            name: "option",
            message: "Select an option",
            choices: [
              PromptOptionType.RegisterESCPOSDevice,
              PromptOptionType.ConnectESCPOSDevice,
              PromptOptionType.UpdateESCPOSDevice,
            ],
          },
        ])
        .then(async (results) => {
          const option = results.option;
          if (option === PromptOptionType.RegisterESCPOSDevice) {
            await ESCPOSController.promptRegisterESCPOSDeviceAsync(
              account,
              () => this.promptOptionsAsync(account),
            );
          } else if (option === PromptOptionType.ConnectESCPOSDevice) {
            await ESCPOSController.promptConnectESCPOSDeviceAsync(
              account,
              () => this.promptOptionsAsync(account),
            );
          } else if (option === PromptOptionType.UpdateESCPOSDevice) {
            await ESCPOSController.promptUpdateESCPOSDeviceAsync(
              account,
              () => this.promptOptionsAsync(account),
            );
          }
          resolve();
        });
    });
  }

  private async onAuthStateChangedAsync(
    event: AuthChangeEvent,
    session: Session | null,
  ): Promise<void> {
    if (!session) {
      return;
    }

    try {
      const account = await AccountService.requestActiveAsync(session);
      if (account && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        await this.promptOptionsAsync(account);
      }
    } catch (error: any) {
      console.error(error);
      this._authSubscription?.unsubscribe();
      await LoginController.promptLoginAsync();
    }
  }
}
