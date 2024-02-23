import ESCPOSService from "../services/escpos.service";
import AccountService from "../services/account.service";
import {
  AccountResponse,
  CreateDeviceRequest,
  DeviceResponse,
} from "../protobuf/core_pb";
import MedusaService from "../services/medusa.service";
import { StockLocation } from "@medusajs/stock-location/dist/models";
import { Printer } from "escpos";
import { PromptNavigation } from "../cli";
import DeviceService, {
  CreateDeviceProps,
  UpdateDeviceProps,
} from "../services/device.service";
import SupabaseService from "../services/supabase.service";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Order } from "@medusajs/medusa";

export enum PromptESCPOSOptionType {
  Network = "Network",
  SerialPort = "Serial Port",
  USBAdapter = "USB Adapter",
}

export enum PromptESCPOSUSBOptionType {
  FindDevice = "Find device",
  Custom = "Custom",
}

class ESCPOSController {
  private _realtimeChannels: Record<string, RealtimeChannel | undefined>;
  constructor() {
    this._realtimeChannels = {};
  }
  public async promptRegisterESCPOSDeviceAsync(
    account: AccountResponse,
    onFallback: () => void,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      let props: CreateDeviceProps = {
        type: "escpos",
        metadata: {},
      };
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "name",
            message: "Give it a name",
          },
          {
            type: "input",
            name: "stock_location_id",
            message: "Stock location id (sloc_###)",
          },
        ])
        .then(async (results) => {
          const name = results.name as string;
          const stockLocationId = results.stock_location_id as string;
          try {
            const stockLocation = await MedusaService.requestStockLocationAsync(
              stockLocationId,
            );
            if (
              !Object.keys(stockLocation.metadata ?? {}).includes(
                "admin_account_id",
              )
            ) {
              throw new Error(
                "Sales location doesn't have admin account id",
              );
            }

            const adminAccountId = stockLocation.metadata
              ?.["admin_account_id"] as string;
            if (adminAccountId !== account.id) {
              throw new Error("You're not authorized to access this location.");
            }

            props.name = name;
            props.stockLocationId = stockLocationId;
            await this.promptSelectESCPOSDeviceTypeAsync(
              stockLocation,
              account,
              props,
              onFallback,
            );
          } catch (error: any) {
            console.error(error);
            onFallback();
            return;
          }
          resolve();
        });
    });
  }

  public async promptConnectESCPOSDeviceAsync(
    account: AccountResponse,
    onFallback: () => void,
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
          const stockLocationId = results.stock_location_id as string;
          try {
            const stockLocation = await MedusaService.requestStockLocationAsync(
              stockLocationId,
            );
            if (
              !Object.keys(stockLocation.metadata ?? {}).includes(
                "admin_account_id",
              )
            ) {
              throw new Error(
                "Sales location doesn't have admin account id",
              );
            }

            const adminAccountId = stockLocation.metadata
              ?.["admin_account_id"] as string;
            if (adminAccountId !== account.id) {
              throw new Error("You're not authorized to access this location.");
            }

            const devicesResponse = await DeviceService.requestDevicesAsync(
              stockLocationId,
            );
            await this.promptSelectESCPOSDeviceToConnectAsync(
              devicesResponse.devices,
              onFallback,
            );
          } catch (error: any) {
            console.error(error);
            onFallback();
            return;
          }
          resolve();
        });
    });
  }

  public async promptUpdateESCPOSDeviceAsync(
    account: AccountResponse,
    onFallback: () => void,
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
          const stockLocationId = results.stock_location_id as string;
          try {
            const stockLocation = await MedusaService.requestStockLocationAsync(
              stockLocationId,
            );
            if (
              !Object.keys(stockLocation.metadata ?? {}).includes(
                "admin_account_id",
              )
            ) {
              throw new Error(
                "Sales location doesn't have admin account id",
              );
            }

            const adminAccountId = stockLocation.metadata
              ?.["admin_account_id"] as string;
            if (adminAccountId !== account.id) {
              throw new Error("You're not authorized to access this location.");
            }

            const devicesResponse = await DeviceService.requestDevicesAsync(
              stockLocationId,
            );
            await this.promptSelectESCPOSDeviceToUpdateAsync(
              devicesResponse.devices,
              onFallback,
            );
          } catch (error: any) {
            console.error(error);
            onFallback();
            return;
          }
          resolve();
        });
    });
  }

  private async promptSelectESCPOSDeviceToConnectAsync(
    devices: DeviceResponse[],
    onFallback: () => void,
  ): Promise<void> {
    if (devices.length <= 0) {
      console.log("No devices associated to the stock location.");
      onFallback();
      return;
    }

    const names = devices.map((value) => value.name);
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "list",
            name: "device",
            message: "Select an ESCPOS device",
            choices: names,
          },
        ])
        .then(async (results) => {
          const device = devices.find((value) => value.name === results.device);
          if (!device) {
            onFallback();
            return;
          }

          try {
            this.openESCPOSDevice(device, onFallback);
            resolve();
          } catch (error: any) {
            console.error(error);
            onFallback();
            return;
          }
        });
    });
  }

  private async promptSelectESCPOSDeviceToUpdateAsync(
    devices: DeviceResponse[],
    onFallback: () => void,
  ): Promise<void> {
    if (devices.length <= 0) {
      console.log("No devices associated to the stock location.");
      onFallback();
      return;
    }

    const names = devices.map((value) => value.name);
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "list",
            name: "device",
            message: "Select an ESCPOS device",
            choices: names,
          },
        ])
        .then(async (results) => {
          const device = devices.find((value) => value.name === results.device);
          if (!device) {
            onFallback();
            return;
          }

          await this.promptUpdateESCPOSDeviceDetailsAsync(device, onFallback);
        });
    });
  }

  public async promptUpdateESCPOSDeviceDetailsAsync(
    device: DeviceResponse,
    onFallback: () => void,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      let props: UpdateDeviceProps = {
        stockLocationId: device.stockLocationId,
        metadata: {},
      };

      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "name",
            message: "Update name",
            default: device.name,
          },
        ])
        .then(async (results) => {
          const name = results.name as string;
          props.name = name;

          const metadata = JSON.parse(device.metadata);
          props.metadata = metadata;

          const type = metadata?.["type"];
          if (type === "network") {
            await this.promptSelectESCPOSNetworkToUpdateAsync(
              device,
              props,
              onFallback,
            );
          } else if (
            type === "serial-port"
          ) {
            await this.promptSelectESCPOSSerialPortToUpdateAsync(
              device,
              props,
              onFallback,
            );
          } else if (
            type === "usb-adapter"
          ) {
            await this.promptSelectESCPOSUSBCustomToUpdateAsync(
              device,
              props,
              onFallback,
            );
          }
          resolve();
        });
    });
  }

  private async promptSelectESCPOSNetworkToUpdateAsync(
    device: DeviceResponse,
    props: UpdateDeviceProps,
    onFallback: () => void,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const metadata = JSON.parse(device.metadata);
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "address",
            message: "Device IP address",
            default: metadata?.["address"] ?? "",
          },
          {
            type: "input",
            name: "port",
            message: "Device port",
            default: metadata?.["port"] ?? "",
          },
        ])
        .then(async (results) => {
          const address = results.address as string;
          const port = results.port as number;
          props.metadata = {
            ...props.metadata,
            address: address,
            port: port,
          };
          try {
            const response = await DeviceService.requestUpdateAsync(
              device.id,
              props,
            );
            console.log(`${response.name} updated!`);
            onFallback();
            resolve();
          } catch (error: any) {
            console.error(error);
            onFallback();
            return;
          }
        });
    });
  }

  private async promptSelectESCPOSSerialPortToUpdateAsync(
    device: DeviceResponse,
    props: UpdateDeviceProps,
    onFallback: () => void,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const metadata = JSON.parse(device.metadata);
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "port",
            message: "Device port",
            default: metadata?.["port"] ?? "",
          },
        ])
        .then(async (results) => {
          const port = results.port as number;
          props.metadata = {
            ...props.metadata,
            port: port,
          };
          try {
            const response = await DeviceService.requestUpdateAsync(
              device.id,
              props,
            );
            console.log(`${response.name} updated!`);
            onFallback();
            resolve();
          } catch (error: any) {
            console.error(error);
            onFallback();
            return;
          }
        });
    });
  }

  private async promptSelectESCPOSUSBCustomToUpdateAsync(
    device: DeviceResponse,
    props: UpdateDeviceProps,
    onFallback: () => void,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const metadata = JSON.parse(device.metadata);
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "vid",
            message: "Device USB vid",
            default: metadata?.["vid"] ?? "",
          },
          {
            type: "input",
            name: "pid",
            message: "Device USB pid",
            default: metadata?.["pid"] ?? "",
          },
        ])
        .then(async (results) => {
          const vid = results.vid as string;
          const pid = results.pid as string;
          props.metadata = {
            ...props.metadata,
            vid: vid,
            pid: pid,
          };

          try {
            const response = await DeviceService.requestUpdateAsync(
              device.id,
              props,
            );
            console.log(`${response.name} updated!`);
            onFallback();
            resolve();
          } catch (error: any) {
            console.error(error);
            onFallback();
            return;
          }
        });
    });
  }

  private async promptSelectESCPOSDeviceTypeAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
    props: CreateDeviceProps,
    onFallback: () => void,
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
            props.metadata = {
              ...props.metadata,
              type: "network",
            };
            await this.promptSelectESCPOSNetworkToCreateAsync(
              stockLocation,
              account,
              props,
              onFallback,
            );
          } else if (
            results.escpos_option === PromptESCPOSOptionType.SerialPort
          ) {
            props.metadata = {
              ...props.metadata,
              type: "serial-port",
            };
            await this.promptSelectESCPOSSerialPortToCreateAsync(
              stockLocation,
              account,
              props,
              onFallback,
            );
          } else if (
            results.escpos_option === PromptESCPOSOptionType.USBAdapter
          ) {
            props.metadata = {
              ...props.metadata,
              type: "usb-adapter",
            };
            await this.promptSelectESCPOSUSBToCreateAsync(
              stockLocation,
              account,
              props,
              onFallback,
            );
          } else if (results.escpos_option === PromptNavigation.GoBack) {
            onFallback();
          }
          resolve();
        });
    });
  }

  private async promptSelectESCPOSNetworkToCreateAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
    props: CreateDeviceProps,
    onFallback: () => void,
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
          props.metadata = {
            ...props.metadata,
            address: address,
            port: port,
          };
          try {
            const response = await DeviceService.requestCreateAsync(props);
            console.log(`${response.name} created!`);
            onFallback();
            resolve();
          } catch (error: any) {
            console.error(error);
            await this.promptSelectESCPOSDeviceTypeAsync(
              stockLocation,
              account,
              props,
              onFallback,
            );
            return;
          }
        });
    });
  }

  private async promptSelectESCPOSSerialPortToCreateAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
    props: CreateDeviceProps,
    onFallback: () => void,
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
          props.metadata = {
            ...props.metadata,
            port: port,
          };
          try {
            const response = await DeviceService.requestCreateAsync(props);
            console.log(`${response.name} created!`);
            onFallback();
            resolve();
          } catch (error: any) {
            console.error(error);
            await this.promptSelectESCPOSDeviceTypeAsync(
              stockLocation,
              account,
              props,
              onFallback,
            );
            return;
          }
        });
    });
  }

  private async promptSelectESCPOSUSBToCreateAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
    props: CreateDeviceProps,
    onFallback: () => void,
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
            await this.promptSelectESCPOSUSBFindToCreateAsync(
              stockLocation,
              account,
              props,
            );
          } else if (option === PromptESCPOSUSBOptionType.Custom) {
            await this.promptSelectESCPOSUSBCustomToCreateAsync(
              stockLocation,
              account,
              props,
              onFallback,
            );
          } else if (option === PromptNavigation.GoBack) {
            await this.promptSelectESCPOSDeviceTypeAsync(
              stockLocation,
              account,
              props,
              onFallback,
            );
          }
          resolve();
        });
    });
  }

  private async promptSelectESCPOSUSBFindToCreateAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
    props: CreateDeviceProps,
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

  private async promptSelectESCPOSUSBCustomToCreateAsync(
    stockLocation: StockLocation,
    account: AccountResponse,
    props: CreateDeviceProps,
    onFallback: () => void,
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
          props.metadata = {
            ...props.metadata,
            vid: vid,
            pid: pid,
          };

          try {
            const response = await DeviceService.requestCreateAsync(props);
            console.log(`${response.name} created!`);
            onFallback();
            resolve();
          } catch (error: any) {
            console.error(error);
            await this.promptSelectESCPOSDeviceTypeAsync(
              stockLocation,
              account,
              props,
              onFallback,
            );
            return;
          }
        });
    });
  }

  private openESCPOSDevice(
    device: DeviceResponse,
    onFallback: () => void,
  ): void {
    const metadata = JSON.parse(device.metadata);
    const type = metadata?.["type"];
    if (type === "network") {
      const address = metadata?.["address"];
      const port = metadata?.["port"];
      ESCPOSService.createNetworkDevice(device.id, address, port);
    } else if (type === "serial-port") {
      const port = metadata?.["port"];
      ESCPOSService.createSerialDevice(device.id, port);
    } else if (type === "usb-adapter") {
      const vid = metadata?.["vid"];
      const pid = metadata?.["pid"];
      ESCPOSService.createUSBDevice(device.id, vid, pid);
    }

    const printer = ESCPOSService.createPrinter(device.id);
    this._realtimeChannels[device.id]?.unsubscribe();
    this._realtimeChannels[device.id] = SupabaseService.supabaseClient?.channel(
      `device-${device.id}`,
    )
      .on(
        "broadcast",
        {
          event: "CREATED",
        },
        (data: Record<string, any>) => {
          const payload = data["payload"];
          const type = payload["type"];
          if (type === "order") {
            const order = payload["data"] as Order;
            ESCPOSService.openDevice(
              device.id,
              printer,
              (printer: Printer, error: any) => {
                if (error) {
                  console.error(error);
                  return;
                }

                printer.cut();
                printer.close();
              },
            );
          }
        },
      );
    this._realtimeChannels[device.id]?.subscribe();
    onFallback();
  }
}

export default new ESCPOSController();
