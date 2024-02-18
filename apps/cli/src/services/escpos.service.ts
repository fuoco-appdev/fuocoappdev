import { Service } from "../service";
import escpos from "escpos";
escpos.Network = require("escpos-network");
escpos.Serial = require("escpos-serialport");
escpos.USB = require("escpos-usb");

class ESCPOSService extends Service {
  private _device: escpos.Adapter | undefined;
  constructor() {
    super();
  }

  public createNetworkDevice(address: string, port: number): void {
    this._device = new escpos.Network(address, port);
  }

  public createSerialDevice(
    port: number,
    options?: { baudRate: number; autoOpen: boolean } | undefined,
  ): void {
    this._device = new escpos.Serial(port, options);
  }

  public createUSBDevice(
    vid?: string | undefined,
    pid?: string | undefined,
  ): void {
    this._device = new escpos.USB(vid, pid);
  }

  public updateUSBDevice(adapter: escpos.USB): void {
    this._device = adapter;
  }

  public findUSBPrinter(): escpos.USB[] {
    const printers = escpos.USB.findPrinter();
    if (printers) {
      return printers;
    } else {
      return [];
    }
  }

  public openDevice(
    callback: (printer: escpos.Printer, error: any) => void,
    options?: {
      encoding?: string | undefined;
    } | undefined,
  ): void {
    if (!this._device) {
      return;
    }

    const printer = new escpos.Printer(this._device, options);
    this._device?.open((error: any) => {
      callback(printer, error);
    });
  }
}

export default new ESCPOSService();
