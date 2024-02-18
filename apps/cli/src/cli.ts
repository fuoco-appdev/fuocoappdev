import { Router } from "express";
import SupabaseService from "./services/supabase.service";
import ConfigService from "./services/config.service";
import cookie from "cookie";
import { AuthChangeEvent, Session, Subscription } from "@supabase/supabase-js";
import ESCPOSService from "./services/escpos.service";
import AccountService from "./services/account.service";
import { AccountResponse } from "./protobuf/core_pb";
import MedusaService from "./services/medusa.service";
import { StockLocation } from "@medusajs/stock-location/dist/models";
import { Printer } from "escpos";

export enum PromptLoginType {
  Google = "Google",
  Email = "Email",
}

export enum PromptNavigation {
  GoBack = "Go back",
}

export enum PromptOptionType {
  ConnectESCPOSDevice = "Connect ESCPOS device",
}

export enum PromptESCPOSOptionType {
  Network = "Network",
  SerialPort = "Serial Port",
  USBAdapter = "USB Adapter",
}

export enum PromptESCPOSUSBOptionType {
  FindDevice = "Find device",
  Custom = "Custom",
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
    } catch (error: any) {
      console.error(error);
      return;
    }

    await this.promptLoginAsync();
    this._authSubscription = SupabaseService.subscribeToAuthStateChanged(
      this.onAuthStateChangedAsync,
    );
  }

  public async disposeAsync(): Promise<void> {
    this._authSubscription?.unsubscribe();
  }

  private async promptLoginAsync(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "list",
            name: "login_type",
            message: "How would you like to login?",
            choices: [
              PromptLoginType.Google,
              PromptLoginType.Email,
            ],
          },
        ])
        .then(async (results: Record<string, string>) => {
          const loginType = results?.["login_type"] as string;
          if (loginType === PromptLoginType.Google) {
            await this.promptGoogleLoginAsync();
          } else if (loginType === PromptLoginType.Email) {
            await this.promptEmailLoginAsync();
          }
          resolve();
        });
    });
  }

  private async promptGoogleLoginAsync(): Promise<void> {
    if (!SupabaseService.supabaseClient) {
      return;
    }

    try {
      const { data, error } = await SupabaseService.supabaseClient.auth
        .signInWithOAuth({
          provider: "google",
          options: {
            queryParams: {
              prompt: "consent",
            },
            redirectTo: "http://localhost:4200",
          },
        });
      if (error) {
        throw error;
      }

      const url = data?.["url"] as string;
      if (!url) {
        console.error("No url!");
        return;
      }

      console.log(url);
    } catch (error: any) {
      console.error(error);
      await this.promptLoginAsync();
    }
  }

  private async promptEmailLoginAsync(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "email",
            message: "Whats your email?",
          },
          {
            type: "password",
            name: "password",
            message: "Whats your password?",
          },
        ])
        .then(async (results) => {
          if (!SupabaseService.supabaseClient) {
            return;
          }

          const email = results.email;
          const password = results.password;
          try {
            const { data, error } = await SupabaseService.supabaseClient.auth
              .signInWithPassword({
                email: email,
                password: password,
              });
            if (error) {
              throw error;
            }

            if (data.session) {
              const accessToken = data.session.access_token;
              const refreshToken = data.session.refresh_token;
              await SupabaseService.setSessionAsync(accessToken, refreshToken);
            }
          } catch (error: any) {
            console.error(error);
            await this.promptLoginAsync();
          }

          resolve();
        });
    });
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
              PromptOptionType.ConnectESCPOSDevice,
            ],
          },
        ])
        .then(async (results) => {
          const option = results.option;
          if (option === PromptOptionType.ConnectESCPOSDevice) {
            await this.promptSalesLocationAsync(account);
          }
          resolve();
        });
    });
  }

  private async promptSalesLocationAsync(
    account: AccountResponse,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "stock_location_id",
            message: "Stock location id (sloc_###)",
          },
        ])
        .then(async (results) => {
          const stockLocationId = results.stock_location_id;
          try {
            const stockLocation = await MedusaService.requestStockLocationAsync(
              stockLocationId,
            );
            if (
              !Object.keys(stockLocation.metadata ?? {}).includes("account_ids")
            ) {
              throw new Error(
                "Sales location doesn't have authorized accounts",
              );
            }

            const accountIds =
              (stockLocation.metadata?.["account_ids"] as string).split(",");
            if (!accountIds.includes(account.id)) {
              throw new Error("You're not authorized to access this location.");
            }

            await this.promptConnectESCPOSDeviceAsync(stockLocation, account);
          } catch (error: any) {
            console.error(error);
            await this.promptOptionsAsync(account);
            return;
          }
          resolve();
        });
    });
  }

  private async promptConnectESCPOSDeviceAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "list",
            name: "escpos_option",
            message: "Select an ESCPOS connection option",
            choices: [
              PromptESCPOSOptionType.Network,
              PromptESCPOSOptionType.SerialPort,
              PromptESCPOSOptionType.USBAdapter,
              PromptNavigation.GoBack,
            ],
          },
        ])
        .then(async (results) => {
          if (results.escpos_option === PromptESCPOSOptionType.Network) {
            await this.promptConnectESCPOSNetworkAsync(stockLocation, account);
          } else if (
            results.escpos_option === PromptESCPOSOptionType.SerialPort
          ) {
            await this.promptConnectESCPOSSerialPortAsync(
              stockLocation,
              account,
            );
          } else if (
            results.escpos_option === PromptESCPOSOptionType.USBAdapter
          ) {
            await this.promptConnectESCPOSUSBAsync(stockLocation, account);
          } else if (results.escpos_option === PromptNavigation.GoBack) {
            await this.promptOptionsAsync(account);
          }
          resolve();
        });
    });
  }

  private async promptConnectESCPOSNetworkAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "address",
            message: "Device IP address",
            default: "localhost",
          },
          {
            type: "input",
            name: "port",
            message: "Device port",
            default: 9100,
          },
        ])
        .then(async (results) => {
          const address = results.address as string;
          const port = results.port as number;
          ESCPOSService.createNetworkDevice(address, port);
          await this.openESCPOSDeviceAsync(stockLocation, account);
          resolve();
        });
    });
  }

  private async promptConnectESCPOSSerialPortAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "port",
            message: "Device port",
            default: "COM10",
          },
        ])
        .then(async (results) => {
          const port = results.port as number;
          ESCPOSService.createSerialDevice(port);
          await this.openESCPOSDeviceAsync(stockLocation, account);
          resolve();
        });
    });
  }

  private async promptConnectESCPOSUSBAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "list",
            name: "escpos_usb_option",
            message: "Select an ESCPOS USB option",
            choices: [
              PromptESCPOSUSBOptionType.FindDevice,
              PromptESCPOSUSBOptionType.Custom,
              PromptNavigation.GoBack,
            ],
          },
        ])
        .then(async (results) => {
          const option = results.escpos_usb_option;
          if (option === PromptESCPOSUSBOptionType.FindDevice) {
            await this.promptConnectESCPOSUSBFindAsync(stockLocation, account);
          } else if (option === PromptESCPOSUSBOptionType.Custom) {
            await this.promptConnectESCPOSUSBCustomAsync(
              stockLocation,
              account,
            );
          } else if (option === PromptNavigation.GoBack) {
            await this.promptConnectESCPOSDeviceAsync(stockLocation, account);
          }
          resolve();
        });
    });
  }

  private async promptConnectESCPOSUSBFindAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const devices = await ESCPOSService.findUSBPrinter();
      console.log(devices);
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "list",
            name: "escpos_usb_find_option",
            message: "Select an ESCPOS USB device",
            choices: [],
          },
        ])
        .then(async (results) => {
          resolve();
        });
    });
  }

  private async promptConnectESCPOSUSBCustomAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "vid",
            message: "Device USB vid",
            default: "0x01",
          },
          {
            type: "input",
            name: "pid",
            message: "Device USB pid",
            default: "0xff",
          },
        ])
        .then(async (results) => {
          const vid = results.vid as string;
          const pid = results.pid as string;
          ESCPOSService.createUSBDevice(vid, pid);
          await this.openESCPOSDeviceAsync(stockLocation, account);
          resolve();
        });
    });
  }

  private async openESCPOSDeviceAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      ESCPOSService.openDevice(async (printer: Printer, error: any) => {
        if (error) {
          console.error(error);
          await this.promptConnectESCPOSDeviceAsync(stockLocation, account);
          return;
        }
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
      if (account && event === "SIGNED_IN") {
        await this.promptOptionsAsync(account);
      }
    } catch (error: any) {
      console.error(error);
      this._authSubscription?.unsubscribe();
      await this.promptLoginAsync();
    }
  }
}
